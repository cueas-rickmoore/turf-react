import { observable, action } from 'mobx';
import axios from "axios";

export default class AppStore {
    stores;
    model_groups;
    root_data_url;
    valid_components;
    constructor(appstores) {
      this.model_groups = ['controls','threats'];
      /* this.root_data_url = 'http://localhost:6969/app_data/YEAR/'; */
      this.root_data_url = '/app_data/YEAR/';
      this.stores = appstores;
      this.valid_components = ['dashboard', 'home', 'maps',
                               'controlboard', 'controlmap', 'threatboard', 'threatmap', 
                               'externmap', 'controls', 'threats'];
    }

    downloadModelContent(content_model) {
      let url_template = null;
      if (content_model === null) {
          url_template = this.root_data_url + this.stores.models.urlTemplate(this.content_model,'data');
      } else { 
          url_template = this.root_data_url + this.stores.models.urlTemplate(content_model,'data');
      }
      /* let url_template = this.stores.models.urlTemplate(content_model,'data'); */
      let url = url_template.replace(new RegExp('YEAR', 'g'),this.stores.datestore.season.year.toString())
                            .replace('GRIDNODE', this.stores.location.node);
      console.log('Turf AppStore.downloadModelContent from url :\n    ' + url);

      /*
      axios.get(url, { mode:'cors',
                       headers: {'Access-Control-Allow-Origin': 'localhost:3000',
                                 'Content-Type': 'application/json'}
               })
           .then((response) => response.json())
           .then((json) => {
               console.log('Turf AppStore download complete ' + json)
               this.updateModelContent(json);
      });
      window.fetch(url, { mode:'cors', headers: {'Access-Control-Allow-Origin': 'localhost:3000',
                          'Content-Type': 'application/json'} } )
      */
      window.fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log('Turf AppStore download complete ' + json.group + '.' + json.name)
                this.updateModelContent(json);
            });
    }

    @observable contentComponent = 'home';
    @observable contentGroup = null;
    @observable contentModel = null;
    @observable contentKey = null;

    urlTemplate(model, data_type) {
      if (typeof model === 'string') {
        return this.root_data_url + this.props.stores.models.urlTemplate(model, data_type)
      } else { 
          return this.root_data_url + model.urls[data_type];
      }
    }

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

