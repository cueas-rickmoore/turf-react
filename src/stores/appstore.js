import { observable, action } from 'mobx';

import TurfDataModelStore from '../stores/modelstore.js';
import TurfTextStore from '../stores/textstore.js';

export class TurfAppDataStore {
    model;
    text;
    constructor() {
        this.model = new TurfDataModelStore(this);
        this.text = new TurfTextStore(this);
    }
    content_model = 'anthrac';

    @observable contentComponent = 'dashboard';
    @action updateContentPanel(changeEvent) {
        let [component, model] = changeEvent.target.value;
        if (this.contentComponent !== component) {
            /* this.contentComponent = null; */
            this.contentComponent = component;
        }
        if (this.content_model !== model) {
            /* this.content_model = null; */
            this.content_model = model;
            if (this.contentComponent ==='dashboard') {
                this.model.changeDataModel(model);
            }
        }
    }
}

