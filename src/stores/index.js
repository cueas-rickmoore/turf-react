
import AppStore from './appstore.js';

import TurfDataStore from '../stores/datastore.js';
import TurfDataModels from '../stores/models.js';
import TurfLocationStore from '../stores/location.js';
import TurfTextStore from '../stores/textstore.js';

class Stores {
    location;
    modeldata;
    models;
    text;

    constructor() {
        this.appstore = new AppStore(this);
        this.location = new TurfLocationStore();
        this.models = new TurfDataModels();
        this.text = new TurfTextStore();
        this.datastore = new TurfDataStore(this);
    }

}

const stores = new Stores();
export default stores;

