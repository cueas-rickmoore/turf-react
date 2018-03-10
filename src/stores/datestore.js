import { observable, computed, action } from 'mobx';
import moment from 'moment';

export default class TurfDateStore {
    stores;
    constructor(appstores) {
      this.stores = appstores;
    }
    season_span = {
        endDay: [10,31], /* fixed value */
        startDay: [3,1], /* fixed value */
    }
    dateFromArray = (date_array) => {
        return moment([date_array[0], date_array[1]-1, date_array[2]]).startOf('day')
    }

    @observable season = {
        year: 2017,
        dataStart: this.dateFromArray([2017,3,1]),
        endDate: this.dateFromArray([2017,10,31]),
        startDate: this.dateFromArray([2017,3,1]),
    }
    @computed get seasonDates() { return this.season }
    @computed get seasonEndDate() { return this.season.endDate }
    @computed get seasonStartDate() { return this.season.startDate }
    @computed get dataStartDate() { return this.season.dataStart }
    updateSeason(json) {
        let start_date = this.dateFromArray(json.dates.seasonStart);
        if (start_date.year !== this.season.year) {
            this.season = {
                endDate: this.dateFromArray([start_date.year, ...this.season_span.endDay]),
                startDate: this.dateFromArray([start_date.year, ...this.season_span.startDay]),
                year: start_date.year,
            }
        }
        this.season.dataStart = start_date;
    }


    @observable dates = {
        doi: this.dateFromArray([2017,7,13]),
        fcastEnd: this.dateFromArray([2017,7,19]),
        fcastStart: this.dateFromArray([2017,7,14]),
        firstValid: this.dateFromArray([2017,6,4]), 
        lastValid: this.dateFromArray([2017,10,31]), 
    }
    @computed get modelDates() { return this.dates }

    indexForDate = (the_date) => { return the_date.diff(this.dates.firstValid,'d'); }

    @action updateModelDates = (json) => {
        if (json.dates.seasonStart[0] !== this.season.year) {
            this.updateSeason(json);
        }
        /* NEED TO UPDATE THIS TO HANDLE WHEN THERE IS NO FORECAST !!!! */
        let need_first_valid = true;
        let num_dates_changed = 0;
        let new_dates = { };
        Object.entries(json.dates).forEach(([key, value]) => {
            let the_date = this.dateFromArray(value);
            if (the_date !== this.dates[key]) {
                new_dates[key] = the_date;
                num_dates_changed += 1;
            }
            /* first valid was either set or the same as previous value */
            if (key === 'firstValid') { need_first_valid = false }
        });
        if (num_dates_changed > 0) {
            this.dates = Object.assign({}, this.dates, new_dates);
            this.updateDboardIndexes();
            if (need_first_valid) {
                /* firstValid was not in json, set it to seasonStart */
                this.dates.firstValid = this.dateFromArray(json.dates.seasonStart)
                console.log('    set date.firstValid to ' + this.dates.firstValidthe_date.format('MM/DD/YYYY'));
            }
        }
    }

    @computed get doi() {
        return (this.dates.doi ? this.dates.doi : this.lastValidDate.subtract(6, 'd'));
    }
    @computed get fcastEndDate() {
        return (this.dates.fcastEnd ? this.dates.fcastEnd : this.dates.seasonEndDate.add(1,'d'));
    }
    @computed get fcastStartDate() {
        return (this.dates.fcastStart ? this.dates.fcastStart : this.dates.seasonEndDate.add(1,'d'));
    }
    @computed get firstValidDate() { return this.dates.firstValid }
    @computed get lastValidDate() {
        return (this.dates.lastValid ? this.dates.lastValid : this.season_dates.endDate);
    }

    @observable dboard_date_indexes = { first: 36, fcast: 40, last: 45 }
    @computed get dboardDateIndexes() { return this.dboard_date_indexes; }
    @computed get firstThumbDate() {
        return this.firstValidDate.clone().add(this.dboard_date_indexes.first-1, 'd');
    }

    @action updateDboardIndexes() {
        let model = this.stores.models.model;
        let fcast_idx = 999;
        let first_idx = 0;
        let first_valid = this.firstValidDate;
        let last_valid = this.lastValidDate;
        let last_idx = this.indexForDate(last_valid);
        if (this.dates.doi) {
            let doi = this.dates.doi.diff(first_valid,'d');
            first_idx = doi - 3;
            fcast_idx = doi + 1;
            last_idx = first_idx + model.dashboard.table.columns - 1;
        } else {
            let fcast_end = this.fcastStartEnd;
            let fcast_start = this.fcastStartStart;
            if (fcast_start && fcast_start <= last_valid) {
                fcast_idx = this.indexForDate(fcast_start);
                if (fcast_end <= last_valid) {
                    last_idx = this.indexForDate(fcast_end);
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

    @observable map_date = null;
    @computed get mapDate() { return this.map_date }

    @action updateMapDate(new_date) { this.map_date = new_date.clone() }

}

