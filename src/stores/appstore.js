import { observable, action } from 'mobx';

export default class AppStore {
    stores;
    constructor(appstores) {
        this.stores = appstores;
    }

    @observable contentModel = 'anthrac';
    @observable contentComponent = 'dashboard';

    @action updateContentPane(request) {
        console.log('TurfAppDataStore.updateContentPane change requested');
        console.log(    'change request : ' + request.component + ', ' + request.content);
        if (this.contentComponent !== request.component) {
            /* this.contentComponent = null; */
            console.log('    changing contentComponent ' + request.component); 
            this.contentComponent = request.component;
        }
        if (this.contentModel !== request.content) {
            /* this.content_model = null; */
            console.log('    changing contentModel ' + request.content);
            this.contentModel = request.content;
            if (this.contentComponent ==='dashboard') {
                console.log('    calling modeldata store function changeDataModel');
                this.stores.datastore.changeDataModel(request.content);
            }
        }
        console.log('TurfAppDataStore.updateContentPane completed');
    }
}

