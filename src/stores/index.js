
import AppStore from './appstore.js';

// import StorageManager from '../stores/storage.js';
import TurfDataStore from '../stores/datastore.js';
import TurfDateStore from '../stores/datestore.js';
import TurfDataModels from '../stores/models.js';
import TurfExternalMapStore from '../stores/external.js';
import TurfLocationStore from '../stores/locations.js';
import TurfTextStore from '../stores/textstore.js';

class Stores {
    appstore;
    datastore;
    datestore;
    external;
    location;
    locations;
    models;
    storage;
    text;

    app_root_url;
    data_root_url;

    constructor(history) {
        this.app_root_url = process.env.REACT_APP_HOME_URL;
        this.data_root_url = process.env.REACT_APP_DATA_URL;
        this.history = history;

        //this.storage_manager = new StorageManager();

        this.datestore = new TurfDateStore(this);
        this.models = new TurfDataModels();
        this.external = new TurfExternalMapStore();
        this.locations = new TurfLocationStore(this);
        this.text = new TurfTextStore();
        this.datastore = new TurfDataStore(this);
        this.appstore = new AppStore(this);
    }
}

export default Stores;

