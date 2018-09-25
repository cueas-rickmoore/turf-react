
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
        console.log('SRC/STORES/INDEX.constructor() :')
        console.log('    process.env.REACT_APP_COMMON_URL = ' + process.env.REACT_APP_COMMON_URL)
        this.app_common_url = process.env.REACT_APP_COMMON_URL;
        console.log('    this.app_common_url = ' + this.app_common_url)
        this.app_root_url = process.env.REACT_APP_ROOT_URL;
        console.log('    process.env.REACT_APP_ROOT_URL = ' + process.env.REACT_APP_DATA_URL)
        console.log('    this.app_root_url = ' + this.app_root_url)
        this.data_root_url = process.env.REACT_APP_DATA_URL
        console.log('    process.env.REACT_APP_DATA_URL = ' + process.env.REACT_APP_DATA_URL)
        console.log('    this.data_root_url = ' + this.data_root_url)
        this.history = history;

        console.log('App Stores : checking last visited')
        let ignore = ['app','home',null];
        let last_visited = localStorage.getItem('last_visited');
        console.log('    last_visited = ' + last_visited)
        console.log('    ignore.indexOf(last_visited) = ' + ignore.indexOf(last_visited))

        this.datestore = new TurfDateStore(this);
        this.models = new TurfDataModels();
        this.text = new TurfTextStore();
        this.external = new TurfExternalMapStore();
        this.locations = new TurfLocationStore(this);
        this.datastore = new TurfDataStore(this);
        this.appstore = new AppStore(this);
        if (ignore.indexOf(last_visited) === -1) {
            this.appstore.uriToContentPane(last_visited);
        }
    }
}

export default Stores;

