import { observable, action } from 'mobx';

export default class AppStore {
    stores;
    supported_groups;
    constructor(appstores) {
      this.stores = appstores;
      /* this.stores.models.changeDataModel('anthrac'); */
      this.supported_groups = ['controls', 'home', 'threats'];
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
    @observable contentModel = null;
    @observable contentKey = null;

    @action updateContentPane(request) {
      console.log('Turf AppStore.updateContentPane change requested');
      console.log(    'change request : ' + request.component + ', ' + request.contentModel + ', ' + request.contentKey);
      if (request.contentModel) {
        if (request.contentModel !== this.contentModel) {
            console.log('    initiating model content download for "' + request.contentModel);
            this.stores.datastore.obliviate();
            this.contentModel = request.contentModel;
            this.downloadModelContent(this.contentModel);
        }
      } else { this.content_model = null; }

      if (request.contentKey) {
        if (request.contentKey !== this.contentKey) {
          this.contentKey = request.contentKey;
        }
      } else if (this.contentKey) {
        this.contentKey = null;
      }

      if (request.component !== this.contentComponent) {
        console.log('    changing contentComponent ' + request.component); 
        this.contentComponent = request.component;
      }
      console.log('Turf AppStore.updateContentPane completed');
    }

    @action updateModelContent = (json) => {
      if (this.supported_groups.indexOf(json.group) === -1) {
        console.log('Turf AppStore.updateModelContent : JSON FILE CONTENT ERROR');
        console.log('    received json for unknown model "' + json.group + '.' + json.name + '"');
      } else {
        this.contentModel = json.name;
        this.stores.models.changeDataModel(json.name);
        this.stores.datestore.updateModelDates(json);
        this.stores.datastore.updateModelData(json);
      }
    }

}

