import { observable, computed, action } from 'mobx';
import moment from 'moment';


class TurfDataModelConfig {

    models = {
        defaults: {
            dbchart: { colors: ['#00aa00','#ffd700','#ff0000'],
                       zones: [1.1,2.1,3.1],
            },
            dbtable: { columns: 10,
                       labels: ['No Risk','Moderate','High'],
                       risk: ['no_risk','moderate','high'],
            },
            dbthumbs: { count: 7, start: 'doi',},
        },
        anthrac: { 
            dbchart: { seriesName:'Anthracnose Risk', },
            dbthumbs: { altString: "SLASHED Anthracnose Risk Map", },
            dbtitle: "Anthracnose Risk Estimates",
        },
        bpatch: { 
            dbchart: { seriesName:'Brown Patch Risk', },
            dbthumbs: { altString: "SLASHED Brown Patch Risk Map", },
            dbtitle: "Brown Patch Risk Estimates",
        },
        dspot: { 
            dbchart: { seriesName:'Dollarspot Risk', },
            dbthumbs: { altString: "SLASHED Dollarspot Risk Map", },
            dbtitle: "Dollarspot Risk Estimates",
        },
        hstress: { 
            dbchart: { seriesName:'Heat Stress Index', },
            dbthumbs: { altString: "SLASHED Heat Stress Index Map", },
            dbtitle: "Heat Stress Index Estimates",
        },
        pblight: { 
            dbchart: { seriesName:'Pythium Blight Risk', },
            dbthumbs: { altString: "SLASHED Pythium Blight Risk Map", },
            dbtitle: "Pythium Blight Risk Estimates",
        },
    }

    urls = {
        data: {
            anthrac  :'/data/YEAR/json/Anthracnose/YEAR-GRIDNODE-Anthracnose-Risk.json',
            bpatch   :'/data/YEAR/json/Brown-Patch/YEAR-GRIDNODE-Brown-Patch-Risk.json',
            dandelion:'/data/YEAR/json/Dollarspot/YEAR-GRIDNODE-Dandelion.json',
            dspot    :'/data/YEAR/json/Dollarspot/YEAR-GRIDNODE-Dollarspot-Risk.json',
            hstress  :'/data/YEAR/json/Heat-Stress/YEAR-GRIDNODE-Heat-Stress-Risk.json',
            pblight  :'/data/YEAR/json/Pythium-Blight/YEAR-GRIDNODE-Pythium-Blight-Risk.json',
            seedhead :'/data/YEAR/json/Dollarspot/YEAR-GRIDNODE-Seedhead.json',
        },
        maps: {
            anthrac:  '/data/YEAR/maps/Anthracnose/DATESTR-Anthracnose-Risk-Map.png',
            bpatch   :'/data/YEAR/maps/Brown-Patch/DATESTR-Brown-Patch-Risk-Map.png',
            dandelion:'/data/YEAR/maps/Dandelion/DATESTR-Dandelion-TREATMENT-Map.png',
            dspot    :'/data/YEAR/maps/Dollarspot/DATESTR-Dollarspot-Risk-Map.png',
            hstress  :'/data/YEAR/maps/Heat-Stress/DATESTR-Heat-Stress-Risk-Map.png',
            pblight  :'/data/YEAR/maps/Pythium-Blight/DATESTR-Pythium-Blight-Risk-Map.png',
            seedhead :'/data/YEAR/maps/Seedhead/DATESTR-Seedhead-TREATMENT-Map.png',
        },
        thumbs: {
            anthrac  :'/data/YEAR/thumbs/Anthracnose/DATESTR-Anthracnose-Risk-Thumbnail.png',
            bpatch   :'/data/YEAR/thumbs/Brown-Patch/DATESTR-Brown-Patch-Risk-Thumbnail.png',
            dandelion:'/data/YEAR/thumbs/Dandelion/DATESTR-Dandelion-TREATMENT-Thumbnail.png',
            dspot    :'/data/YEAR/thumbs/Dollarspot/DATESTR-Dollarspot-Risk-Thumbnail.png',
            hstress  :'/data/YEAR/thumbs/Heat-Stress/DATESTR-Heat-Stress-Risk-Thumbnail.png',
            pblight  :'/data/YEAR/thumbs/Pythium-Blight/DATESTR-Pythium-Blight-Risk-Thumbnail.png',
            seedhead :'/data/YEAR/thumbs/Seedhead/DATESTR-Seedhead-TREATMENT-Thumbnail.png',
        },
    }

    dataModel = function(model_name) {
        let defaults = this.models.defaults
        let model = this.models[model_name]
        let urls = this.urls;
        return { dbchart: Object.assign({}, defaults.dbchart, model.dbchart),
                 dbtable: Object.assign({}, defaults.dbtable, model.dbtable),
                 dbthumbs: Object.assign({}, defaults.dbthumbs, model.dbthumbs),
                 dbtitle: model.dbtitle,
                 name: model_name,
                 urls: {data:urls.data[model_name],maps:urls.maps[model_name],thumbs:urls.thumbs[model_name]},
        }
    }
}

const gridNodeString = function(lat, lon) {

    function adjustPrecision(value, precision) {
        var mapping = [ [0.02084,'000'], [0.06249,'042'], [0.10416,'083'], [0.14584,'125'],
                        [0.18759,'167'], [0.22916,'208'], [0.27084,'250'], [0.31249,'292'],
                        [0.35416,'333'], [0.39584,'375'], [0.43649,'417'], [0.47916,'583'],
                        [0.52084,'500'], [0.56249,'542'], [0.60416,'583'], [0.64584,'625'],
                        [0.68749,'667'], [0.72916,'708'], [0.77084,'750'], [0.81249,'792'],
                        [0.85416,'833'], [0.89584,'875'], [0.93749,'917'], [0.97916,'958']
                      ];
        var valstr;
        if (value < 0.0) { valstr = value.toString().slice(1); } else { valstr = value.toString(); }
        var dot_indx = valstr.indexOf('.');
        var left = valstr.substring(0,dot_indx);
        var right = parseFloat(valstr.substring(dot_indx));
        var i, pair;

        for (i=0; i < mapping.length; i++) {
            pair = mapping[i];
            if (right < pair[0]) { return left + pair[1]; } 
        }
        return left + '000';
    }

    return adjustPrecision(lon, 3).slice(1) + '-' + adjustPrecision(lat, 3);
}


export default class TurfDataModelStore {
    app;
    config;
    constructor(app) {
        this.app = app;
        this.config = new TurfDataModelConfig();
    }

    /* @observable data_model = { name:'missing', }; */
    @observable data_model = this.config.dataModel('anthrac');
    @action changeDataModel = (changeEvent) => {
        if (changeEvent.target.value !== this.data_model.name) {
            this.data_model = this.config.dataModel(changeEvent.target.value);
            this.downloadModelData();
        }
    }
    @computed get dataModel() { return this.data_model }

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
    @computed get modelData() { return this.model_data }

    @action downloadModelInfo = () => {
        let url = this.urls[this.data_model.name].replace(new RegExp('YEAR', 'g'),this.season.toString()).replace('NODE', this.location.node);
        window.fetch(url)
            .then(json => {
                this.updateModelData(json);
                this.updateModelDates(json);
            })
            .catch(err => {
                console.log("failed to load data for " + this.data_model.name);
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
                if (dates.fcastEnd <= dates.lastValid) { last_idx = dates.fcastEnd.diff(first_valid,'d'); }
            }
            first_idx = last_idx - this.data_model.dbtable.columns + 1;
        }
        this.dboard_date_indexes = {
            first: first_idx,
            last: last_idx,
            fcast: fcast_idx,
        }
    }

    @observable location = {
        address:'Robert Trent Jones Golf Course, Cornell University',
        lat:42.458, lon:-76.458, node:'76458-42458',
    }
    @action updateLocation = (changeEvent) => {
        let loc_obj = changeEvent.target.value;
        let node_str = gridNodeString(loc_obj.lat, loc_obj.lon);
        if (this.location.node !== node_str) {
            this.location = null;
            this.location = Object.assign({}, loc_obj, {node:node_str})
            this.downloadModelData();
        }
    }
    @computed get locationDetails() { return this.location; }

}

