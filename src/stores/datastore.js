import { observable, computed, action } from 'mobx';
import moment from 'moment';

export default class TurfDataStore {
    stores;
    constructor(appstores) {
      this.stores = appstores;
      console.log('TurfDataStore.constructor  this.stores = ' + this.stores);
    }

    @observable model_name = 'anthrac';
    @action changeDataModel = (model_name) => {
        if (model_name !== this.model_name) {
            console.log('TurfModelDataStore changeing model from "' + this.model_name + '" to "' + model_name + '"');
            this.downloadModelInfo(model_name);
        }
    }
    @computed get modelName() { return this.model_name }
    pendingModelName = null;

    @observable average_risk = [0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,0,1,0,0,1,2,0,0,0,0,0,0,2,2,1,0,0,0,0,1,0,0,0,0,2,2,2,2,1,1,1,1,2,2,1,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    @action updateAverageRisk(json) { this.average_risk = json.data.average; }
    @computed get averageRisk() { return this.average_risk }

    @observable daily_risk = [0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,0,1,0,0,1,2,0,0,0,0,0,0,2,2,1,0,0,0,0,1,0,0,0,1,2,1,1,0,0,1,1,1,2,2,1,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    @action updateDailyRisk(json) { this.daily_risk = json.data.daily; }
    @computed get dailyRisk() { return this.daily_risk }

    @action updateModel = (json) => {
        if (json.group !== 'model') {
            console.log('TurfDataStore.updateModel : JSON FILE CONTENT ERROR');
            console.log('    data for "' + json.group + '"group found instead of "model" group.');
        } else if (this.pendingModelName && json.name !== this.pendingModelName) {
            console.log('TurfDataStore.updateModel : JSON FILE CONTENT ERROR');
            console.log('    "' + json.name + '" data found instead of "' + this.pendingModelName + '" data.');
        } else {
            console.log('TurfDataStore.updateModel json :');
            console.log(json); 
            this.pendingModelName = null;
            this.model_name = json.name;
            this.updateModelDates(json);
            this.updateAverageRisk(json);
            this.updateDailyRisk(json);
        }
    }

    @action downloadModelInfo = (model_name) => {
        console.log('TurfDataStore.downloadModelInfo for : ' + model_name); 
        console.log('    this.stores.models : ' + this.stores.models);
        let model = this.stores.models.model(model_name);
        let url = model.urls.data.replace(new RegExp('YEAR', 'g'),this.season.year.toString()).replace('GRIDNODE', this.stores.location.node);
        console.log('TurfDataStore.downloadModelInfo ... fetching data from url :\n    ' + url); 
        this.pendingModelName = model_name;
        window.fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log('TurfDataStore.downloadModelInfo json file received : ');
                console.log(json);
                this.updateModel(json);
            })
            .catch(err => {
                console.log("failed to load data for " + this.pendingModelName);
                console.log(err)
            });
    }

    @observable season = {
        year: 2017,
        endDate: moment([2017,7,31]),
        startDate: moment([2017,2,1]),
    }
    @computed get seasonDates() { return this.season }
    @action updateSeason(json) {
        if (json.dates.seasonStart.year !== this.season.year) {
            this.season = {
                end_date: moment(json.dates.seasonEnd),
                start_date: moment(json.dates.seasonStart),
                year: json.dates.seasonStart[0],
            }
        }
    }

    @observable model_dates = {
        doi: moment([2017,6,13]),
        fcastEnd: moment([2017,6,19]),
        fcastStart: moment([2017,6,14]),
        firstValid: moment([2017,5,4]), 
        lastValid: moment([2017,7,31]), 
    }
    @computed get modelDates() { return this.model_dates }
    @action updateModelDates = (new_dates) => {
        let dates = Object.assign({}, this.model_dates, new_dates);
        this.model_dates = dates;
        this.updateDboardIndexes();
    }

    @observable dboard_date_indexes = { first: 36, fcast: 40, last: 45 }
    @computed get dboardDateIndexes() { return this.dboard_date_indexes; }

    @action updateDboardIndexes() {
        console.log('TurfDataStore.updateDboardIndexes for "' + this.model_name + '"');
        let model = this.stores.models.model(this.model_name);
        console.log('TurfDataStore.updateDboardIndexes model : ' + model);
        let dates = this.modelDates;
        let season = this.seasonDates;
        let first_idx = 0;
        let fcast_idx = 999;
        let last_idx = dates.lastValid.diff(dates.seasonStart,'d');
        let first_valid = (dates.firstValid ? dates.firstValid : season.seasonStart);
        if (dates.doi) {
            let doi = dates.doi.diff(first_valid,'d');
            first_idx = doi - 3;
            fcast_idx = doi + 1;
            last_idx = first_idx + model.dashboard.table.columns - 1;
        } else {
            if (dates.fcastStart && dates.fcastStart <= dates.lastValid) {
                fcast_idx = dates.fcastStart.diff(first_valid,'d');
                if (dates.fcastEnd <= dates.lastValid) {
                    last_idx = dates.fcastEnd.diff(first_valid,'d');
                }
            }
            first_idx = last_idx - model.dashboard.table.columns + 1;
        }
        this.dboard_date_indexes = {
            first: first_idx,
            last: last_idx,
            fcast: fcast_idx,
        }
    }

}

