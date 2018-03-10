
import AppStore from './appstore.js';

import TurfDataStore from '../stores/datastore.js';
import TurfDateStore from '../stores/datestore.js';
import TurfDataModels from '../stores/models.js';
import TurfLocationStore from '../stores/location.js';
import TurfTextStore from '../stores/textstore.js';

class Stores {
    location;
    modeldata;
    models;
    text;

    constructor() {
        this.models = new TurfDataModels();
        this.location = new TurfLocationStore();
        this.text = new TurfTextStore();
        this.datestore = new TurfDateStore(this);
        this.datastore = new TurfDataStore(this);
        this.appstore = new AppStore(this);
    }

}

const stores = new Stores();
export default stores;

