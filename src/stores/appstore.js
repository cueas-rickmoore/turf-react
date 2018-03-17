import { observable, action } from 'mobx';

export default class AppStore {
    stores;
    valid_components;
    valid_models;
    constructor(appstores) {
      this.stores = appstores;
      this.model_groups = ['controls','threats'];
      this.valid_components = ['dashboard', 'home', 'maps',
                               'controlboard', 'controlmap', 'threatboard', 'threatmap', 
                               'externmap', 'controls', 'threats'];
    }

    downloadModelContent(content_model) {
      let url_template = this.stores.models.urlTemplate(content_model,'data');
      let url = url_template.replace(new RegExp('YEAR', 'g'),this.stores.datestore.season.year.toString())
                            .replace('GRIDNODE', this.stores.location.node);
      console.log('Turf AppStore.downloadModelContent ... fetching data from url :\n    ' + url);
      window.fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log('Turf AppStore download complete ' + json.group + '.' + json.name)
                this.updateModelContent(json);
            });
            /*
            .catch(err => {
               console.log("failed to load data for " + content_model);
               console.log(" download error : \n" + err.toString())
            });
            */
    }

    @observable contentComponent = 'home';
    @observable contentGroup = null;
    @observable contentModel = null;
    @observable contentKey = null;

    @action updateContentPane(request) {
      console.log('Turf AppStore.updateContentPane change requested');
      console.log(    'change request : ' + request.component + ', ' + request.contentGroup + ', ' + request.contentModel + ', ' + request.contentKey);
      if (!this.valid_components.includes(request.component)) {
        throw new ReferenceError('"' + request.component + '" is not a valid component name.'); 
      }

      if (request.contentGroup !== this.contentGroup) {
        this.contentGroup = request.contentGroup;
      }

      if (request.contentModel !== this.contentModel) {
        console.log('    initiating model content download for "' + request.contentModel);
        this.contentModel = request.contentModel;
        if (this.stores.models.isValidModel(this.contentModel)) {
          this.stores.datastore.obliviate();
          this.downloadModelContent(this.contentModel);
        }
      }

      if (request.contentKey !== this.contentKey) {
        this.contentKey = request.contentKey;
      }

      if (request.component !== this.contentComponent) {
        console.log('    changing contentComponent ' + request.component); 
        this.contentComponent = request.component;
      }
      console.log('Turf AppStore.updateContentPane completed');
    }

    @action updateModelContent = (json) => {
      if (this.model_groups.includes(json.group) && this.stores.models.isValidModel(json.name)) {
        this.contentModel = json.name;
        this.stores.models.changeDataModel(json.name);
        this.stores.datestore.updateModelDates(json);
        this.stores.datastore.updateModelData(json);
      } else {
        console.log('Turf AppStore.updateModelContent : JSON FILE CONTENT ERROR');
        console.log('    received json for unknown data model "' + json.group + '.' + json.name + '"');
      }
    }

}

