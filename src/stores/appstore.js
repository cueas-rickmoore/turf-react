import { observable, action } from 'mobx';
//import axios from "axios";

export default class AppStore {
    common_url;
    history;
    logos;
    model_groups;
    root_data_url;
    stopHistory;
    stores;
    valid_components;

    constructor(appstores) {
      this.common_url = '/app_data/common';
      this.model_groups = ['controls','threats'];
      /* this.root_data_url = 'http://localhost:6969/app_data/YEAR/'; */
      this.root_data_url = '/app_data/NE/YEAR/';
      this.stores = appstores;
      this.valid_components = ['dashboard', 'home', 'maps',
                               'controlboard', 'controlmap', 'threatboard', 'threatmap', 
                               'externmap', 'controls', 'threats'];


      
      this.history = appstores.history;
      this.history.listen((h_location, h_action) => {
        console.log('HISTORY LISTEN : ' + h_action)
        console.log('                  h_location.path : ' + h_location.path)
        console.log('              h_location.pathname : ' + h_location.pathname)
        console.log('                 h_location.state : ' + h_location.state)
        if (typeof h_location.state !== 'undefined') { 
          console.log('       h_location.state.component : ' + h_location.state.component)
        }
        if (['/home', 'home', '/'].indexOf(h_location.pathname) > -1) {
            this.updateContentPane({component:'home',});
        } else {
          if (typeof h_location.state === 'undefined') {
            let params = h_location.pathname.split('/')
            if (params[0] === 'app') {
              let request = { component:params[1], contentGroup:params[2], contentModel:params[3], contentKey:null }
              if (params.length > 4) { request.contentKey = params[4]; }
              this.updateContentPane(request);
            }
          } else { this.updateContentPane(h_location.state) }
        }
      })
      this.logos = {
          CUTT: 'shortcutt.png',
          NOAA: 'noaa-rcc-logo.png',
          NRCC: 'nrcc-logo-square.png',
          TURF: 'CUTurfLogo.jpg',
      }
    }

    commonUrl(uri) { return this.common_url + '/' + uri; }

    @observable contentComponent = 'home';
    @observable contentGroup = null;
    @observable contentModel = null;
    @observable contentKey = null;

    downloadModelContent(content_model) {
      let url_template = null;
      if (content_model === null) {
          url_template = this.root_data_url + this.stores.models.urlTemplate(this.contentModel,'data');
      } else { 
          url_template = this.root_data_url + this.stores.models.urlTemplate(content_model,'data');
      }
      /* let url_template = this.stores.models.urlTemplate(content_model,'data'); */
      let url = url_template.replace(new RegExp('YEAR', 'g'),this.stores.datestore.season.year.toString())
                            .replace('GRIDNODE', this.stores.locations.node);
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

    goHome() {
        this.history.push('/app/home', {component:'home', contentGroup:null, contentModel:null, contentKey:null}) 
    }

    imageUrl(image_uri) { return this.common_url + '/images/' + image_uri; }
    logoUrl(key) { return this.imageUrl(this.logos[key]); }

    requestToContentPane(request) {
      console.log('request :: ', request)
      if (request.contentKey !== null) {
        let uri = '/app/' + [request.component, request.contentGroup, request.contentModel, request.contentKey].join('/')
        this.history.push(uri, request)
      } else {
        let uri = '/app/' + [request.component, request.contentGroup, request.contentModel].join('/')
        this.history.push(uri, request)
      }
    }

    requestToUri(request) {
      if (request.component === 'home') {
          return 'home';
      } else { 
        if (request.contentKey !== null) {
           return [request.component, request.contentGroup, request.contentModel, request.contentKey].join('/')
        } else {
           return [request.component, request.contentGroup, request.contentModel].join('/')
        }
      }
    }

    uriToContentPane(uri) {
      console.log('uriToContentPane :: ', uri)
      if (uri === 'app' || uri === 'home') {
        let request = { component:'home', contentGroup:null, contentModel:null, contentKey:null };
        this.history.push('/app', request)
      } else { this.history.push('/app/' + uri, this.uriToRequest(uri)); }
      /*
      if (uri === 'app' || uri === 'home') {
        let request = { component:'home', contentGroup:null, contentModel:null, contentKey:null };
        this.history.push('/app', request)
      } else {
        let content = uri.split('/');
        let request = { component:content[0], contentGroup:content[1], contentModel:content[2] };
        if (content.length === 3) { request['contentKey'] = null;
        } else { request['contentKey'] = content[3]; }
        this.history.push('/app/' + uri, request)
      }
      */
    }

    uriToRequest(uri) {
      if (uri === 'app' || uri === 'home' ) {
          return {component:'home', contentGroup:null, contentModel:null, contentKey:null};
      } else {
        let content = uri.split('/');
        let request =  { component:content[0], contentGroup:content[1], contentModel:content[2] }
        if (content.length === 4) { 
            request['contentKey'] = content[3];
        } else { request['contentKey'] = null; }
        return request;
      }
    }

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
      if (request.component === 'home') {

        this.contentKey = undefined;
        this.contentModel = undefined;
        this.contentGroup = undefined;
        this.contentComponent = request.component;

      } else {
        
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
      }

      localStorage.setItem('last_visited', this.requestToUri(request));

      console.log('Turf AppStore.updateContentPane completed');
    }

    @action updateModelContent = (json) => {
      console.log('Turf AppStore.updateModelContent :')
      console.log('    json group/name : ' + json.group + ' / ' + json.name)
      console.log('    isValidModel(json.name) : ' + this.stores.models.isValidModel(json.name))
      if (this.model_groups.includes(json.group) && this.stores.models.isValidModel(json.name)) {
        console.log('    previous model : ' + this.contentModel)
        this.contentModel = json.name;
        console.log('    new model : ' + this.contentModel)
        this.stores.models.changeDataModel(json.name);
        console.log('    updating model dates')
        this.stores.datestore.updateModelDates(json);
        console.log('    updating model data')
        this.stores.datastore.updateModelData(json);
        console.log('PAGE DATA SHOULD BE UPDATED !!!')
      } else {
        console.log('Turf AppStore.updateModelContent : JSON FILE CONTENT ERROR');
        console.log('    received json for unknown data model "' + json.group + '.' + json.name + '"');
      }
    }

}

