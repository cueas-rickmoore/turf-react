import { observable, computed, action } from 'mobx';
import moment from 'moment';

export default class TurfDateStore {
    stores;
    constructor(appstores) {
      this.stores = appstores;
      /* let doi = this.dateFromArray([moment().year(), 4, 12]); */
      let doi = moment(new Date());
      this.initializeSeason(doi.year());
      this.initializeDates(doi);
    }

    season_span = {
        endDay: [10,31], /* fixed value */
        startDay: [3,1], /* fixed value */
    }

    dateFromArray = (date_array) => {
        return moment([date_array[0], date_array[1]-1, date_array[2]]).startOf('day')
    }

    @observable season = {
    /*    year: 2017,
        dataStart: this.dateFromArray([2017,3,1]),
        endDate: this.dateFromArray([2017,10,31]),
        startDate: this.dateFromArray([2017,3,1]),
    */
    }
    @computed get seasonDates() { return this.season }
    @computed get seasonEndDate() { return this.season.endDate }
    @computed get seasonStartDate() { return this.season.startDate }
    @computed get dataStartDate() { return this.season.dataStart }

    initializeSeason(new_year) {
        let year = new_year;
        if (year === null) { year = moment().year(); }
        let start_date = this.dateFromArray([year, ...this.season_span.startDay]);
        this.season = {
            dataStart: start_date,
            endDate: this.dateFromArray([year, ...this.season_span.endDay]),
            startDate: start_date, 
            year: year
        }
        console.log('in initializeSeason :')
        console.log('      year : ' + this.season.year)
        console.log(' dataStart : ' + this.season.dataStart.format('MM/DD/YYYY'))
        console.log(' startDate : ' + this.season.startDate.format('MM/DD/YYYY'))
        console.log('   endDate : ' + this.season.endDate.format('MM/DD/YYYY'))
    }

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

        console.log('in updateSeason :')
        console.log('      year : ' + this.season.year)
        console.log(' dataStart : ' + this.season.dataStart.format('MM/DD/YYYY'))
        console.log(' startDate : ' + this.season.startDate.format('MM/DD/YYYY'))
        console.log('   endDate : ' + this.season.endDate.format('MM/DD/YYYY'))
    }

    @observable dates = {
        doi: this.dateFromArray([2017,7,13]),
        fcastEnd: this.dateFromArray([2017,7,19]),
        fcastStart: this.dateFromArray([2017,7,14]),
        firstValid: this.dateFromArray([2017,6,4]), 
        lastValid: this.dateFromArray([2017,10,31]), 
    }
    initializeDates(new_doi) {
        let doi = new_doi;
        if (doi === null) {
            let today = moment(new Date());
            let last_valid = today.add(5, 'days');
            this.dates = {
                doi: today.subtract(1, 'days'),
                fcastEnd: last_valid,
                fcastStart: today,
                firstValid: this.dateFromArray([today.year, ...this.season_span.startDay]),
                lastValid: last_valid
            }
        } else {
            let last_valid = moment(doi);
            last_valid.add(6, 'days');
            let fcast_start = moment(doi);
            fcast_start.add(1, 'days');
            this.dates = {
                doi: doi,
                fcastEnd: last_valid,
                fcastStart: fcast_start,
                firstValid: this.dateFromArray([doi.year, ...this.season_span.startDay]),
                lastValid: last_valid
            }
        }
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
                console.log('    set date.firstValid to ' + this.dates.firstValid.format('MM/DD/YYYY'));
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
        /* let first_valid = this.firstValidDate; */

        /* NEED TO ADD CODE TO BLOCK FIRST FROM BEING EARLIER THAN SEASON START */
        let last_idx = this.indexForDate(this.fcastEndDate);

        this.dboard_date_indexes = {
            first: (last_idx - model.dashboard.table.columns) + 1,
            last: last_idx,
            fcast: this.indexForDate(this.fcastStartDate),
        }
    }

    @observable map_date = null;
    @computed get mapDate() { return this.map_date }

    @action updateMapDate(new_date) { this.map_date = new_date.clone() }

}

