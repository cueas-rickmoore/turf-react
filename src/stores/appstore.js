import { observable, action } from 'mobx';

import TurfModelDataStore from '../stores/modeldata.js';
import TurfDataModels from '../stores/models.js';
import TurfLocationStore from '../stores/location.js';
import TurfTextStore from '../stores/textstore.js';

export class TurfAppDataStore {
    location;
    modeldata;
    models;
    text;

    constructor() {
        this.location = new TurfLocationStore(this);
        this.modeldata = new TurfModelDataStore(this);
        this.models = new TurfDataModels(this);
        this.text = new TurfTextStore(this);
    }

    @observable contentModel = 'anthrac';
    @observable contentComponent = 'dashboard';

    @action updateContentPane(changeEvent) {
        let [comp_name, model_name] = changeEvent.target.value;
        if (this.contentComponent !== comp_name) {
            /* this.contentComponent = null; */
            this.contentComponent = comp_name;
        }
        if (this.contentModel !== model_name) {
            /* this.content_model = null; */
            this.contentModel = model_name;
            if (this.contentComponent ==='dashboard') {
                this.modeldata.changeDataModel(model_name);
            }
        }
    }
}

