import { observable, computed, action } from 'mobx';
import moment from 'moment';


export default class TurfModelDataStore {
    app;
    constructor(app) {
        this.app = app;
    }

    /* @observable data_model = { name:'missing', }; */
    @observable model_name = 'anthrac';
    @action changeDataModel = (changeEvent) => {
        if (changeEvent.target.value !== this.model_name) {
            this.model_name = changeEvent.target.value;
            this.downloadModelData();
        }
    }
    @computed get modelName() { return this.model_name }

    @observable average_risk = [0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,0,1,0,0,1,2,0,0,0,0,0,0,2,2,1,0,0,0,0,1,0,0,0,0,2,2,2,2,1,1,1,1,2,2,1,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    @action updateAverageRisk(json) { this.average_risk = json.data.average; }
    @computed get averageRisk() { return this.average_risk }

    @observable daily_risk = [0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,0,1,0,0,1,2,0,0,0,0,0,0,2,2,1,0,0,0,0,1,0,0,0,1,2,1,1,0,0,1,1,1,2,2,1,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    @action updateDailyRisk(json) { this.daily_risk = json.data.daily; }
    @computed get dailyRisk() { return this.daily_risk }

    @action updateModelData = (json) => {
        this.average_risk = json.data.average;
        this.daily_risk = json.data.daily;
    }

    @action downloadModelInfo = () => {
        let url = this.urls[this.model_name].replace(new RegExp('YEAR', 'g'),this.season.toString()).replace('NODE', this.app.location.node);
        window.fetch(url)
            .then(json => {
                this.updateModelData(json);
                this.updateModelDates(json);
            })
            .catch(err => {
                console.log("failed to load data for " + this.model_name);
            });
    }

    @observable season = {
        year: 2017,
        endDate: moment([2017,7,31]),
        startDate: moment([2017,2,1]),
    }
    @action updateSeason(json) {
        if (json.dates.seasonStart.year !== this.season.year) {
            this.season = {
                end_date: moment(json.dates.seasonEnd),
                start_date: moment(json.dates.seasonStart),
                year: json.dates.seasonStart[0],
            }
        }
    }
    @computed get seasonDates() { return this.season }

    @observable model_dates = {
        doi: moment([2017,6,13]),
        fcastEnd: moment([2017,6,19]),
        fcastStart: moment([2017,6,14]),
        firstValid: moment([2017,5,4]), 
        lastValid: moment([2017,7,31]), 
    }
    @action updateModelDates = (new_dates) => {
        let dates = Object.assign({}, this.model_dates, new_dates);
        this.model_dates = dates;
        this.updateDboardIndexes();
    }
    @computed get modelDates() { return this.model_dates }

    @observable dboard_date_indexes = { first: 36, fcast: 40, last: 45 }
    @computed get dboardDateIndexes() { return this.dboard_date_indexes; }
    @action updateDboardIndexes() {
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
            last_idx = first_idx + this.data_model.dbtable.columns - 1;
        } else {
            if (dates.fcastStart && dates.fcastStart <= dates.lastValid) {
                fcast_idx = dates.fcastStart.diff(first_valid,'d');
                if (dates.fcastEnd <= dates.lastValid) {
                    last_idx = dates.fcastEnd.diff(first_valid,'d');
                }
            }
            first_idx = last_idx - this.data_model.dbtable.columns + 1;
        }
        this.dboard_date_indexes = {
            first: first_idx,
            last: last_idx,
            fcast: fcast_idx,
        }
    }

}

