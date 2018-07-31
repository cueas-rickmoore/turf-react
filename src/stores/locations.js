import { action, computed, observable } from 'mobx';

class LocalStorageManager {

  getLocation(key) { // retrieve data for a single location
    console.log('LocalStorageManager.gettLocation : ' + key);
    let locations = this.locations();
    if (typeof locations !== 'undefined' && locations !== null) {
      if (locations.hasOwnProperty(key)) { return locations[key]; }
    }
    return null;
  }

  getSelected() { // retrieve the previously selected location
    let id = this.selectedId();
    if (id !== null) { return this.getLocation(id);
    } else { return null; }
  }

  insertLocation(key, location_obj) { // add/update data for a single location
    console.log('LocalStorageManager.insertLocation : ' + key);
    let locations = this.locations();
    if (locations === null) { locations = { };
    } else { localStorage.removeItem('locations'); }
    locations[key] = location_obj;
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  insertLocations(new_locations) {
    // add/update mulltiple locations
    // "new_locations" must be an object whose named properties contain
    // location objects
    let locations = this.locations();
    if (locations !== null) { localStorage.removeItem('locations'); }
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  locations() { // retrieve all locations
    let existing = localStorage.getItem('locations');
    if (typeof existing !== "undefined" && existing !== null) {
      return JSON.parse(existing);
    } else { return null; }
  }

  removeAllLocations() {
    let existing = localStorage.getItem('locations');
    if (typeof existing !== "undefined" && existing !== null) {
      localStorage.removeItem('locations');
    }
  }

  removeLocation(key) {
    // remove data for a single location from storage
    // "key" is the id (name) of the location to be removed
    console.log('LocalStorageManager.removeLocation : ' + key);
    let locations = this.locations();
    if (locations !== null) {
      if (Object.keys(locations).indexOf(key) !== -1) {
        delete locations[key];
        localStorage.removeItem('locations');
        localStorage.setItem('locations', JSON.stringify(locations));
      }
    }
  }

  removeLocations(stale_keys) {
    // remove data for multiple locations from storage
    // "stale_keys" must be an array of keys (names) for stations
    // to be removed from storage 
    console.log('LocalStorageManager.removeLocations : ' + stale_keys);
    let locations = this.locations();
    if (locations !== null) {
      let deleted = 0;
      locations = Object.keys(locations).map( function(key,i) {
        if (stale_keys.indexOf(key) !== -1) {
          delete locations[key];
          deleted += 1;
        }
        return locations;
      } );
      if (deleted > 0) {
        localStorage.removeItem('locations');
        localStorage.setItem('locations', JSON.stringify(locations));
      }
    }
  }

  replaceAllLocations(locations) {
    let existing = localStorage.getItem('locations');
    if (typeof existing !== "undefined" && existing !== null) {
      localStorage.removeItem('locations');
    }
    localStorage.setItem('locations', JSON.stringify(locations))
  }

  selectedId() { 
    let id = localStorage.getItem('selected');
    if (typeof id !== "undefined" && id !== null) {
      return id;
    } else { return null; }
  }

  setSelected(key) { localStorage.setItem('selected', key); }

}

export default class TurfLocationStore {
    default_location
    location_cache
    location_manager
    selected
    stores

    constructor(stores) {
      this.stores = stores;
      this.default_location = { id: 'default',
        address: 'Robert Trent Jones Golf Course, Cornell University',
        lat: 42.458, lon: -76.458, node: '76458-42458',
      }

      this.location_manager = new LocalStorageManager();
      this.location_cache = this.location_manager.locations();
      console.log('TurfLocationStore.location_cache : ' + typeof this.location_cache);
      //console.log('TurfLocationStore.location_cache.keys : ' + Object.keys(this.location_cache).toString());
      //console.log('TurfLocationStore.location.selectedID : ' + this.location_manager.selectedId());
      if (this.location_cache === null) {
        this.location_cache = { 'default': this.default_location, }
        this.selected = 'default';
      } else { this.selected = this.location_manager.selectedId(); }
      if (this.selected === null) { this.selected = 'default'; }
      console.log('TurfLocationStore this.selected : ' + this.selected)
      this.updateLocationDetails(this.location_cache[this.selected]);
      console.log('TurfLocationStore this.current_location : ' + this.address)
      this.map_dialog = null;
    }

    adjustNodePrecision = (value, precision) => {
        var mapping = [ [0.02084,'000'], [0.06249,'042'], [0.10416,'083'], [0.14584,'125'],
                        [0.18759,'167'], [0.22916,'208'], [0.27084,'250'], [0.31249,'292'],
                        [0.35416,'333'], [0.39584,'375'], [0.43649,'417'], [0.47916,'583'],
                        [0.52084,'500'], [0.56249,'542'], [0.60416,'583'], [0.64584,'625'],
                        [0.68749,'667'], [0.72916,'708'], [0.77084,'750'], [0.81249,'792'],
                        [0.85416,'833'], [0.89584,'875'], [0.93749,'917'], [0.97916,'958']
                      ];
        var valstr;
        if (value < 0.0) { valstr = value.toString().slice(1); } else { valstr = value.toString(); }

        var dot_indx = valstr.indexOf('.');
        var left = valstr.substring(0,dot_indx);
        var right = parseFloat(valstr.substring(dot_indx));
        var i, pair;

        for (i=0; i < mapping.length; i++) {
            pair = mapping[i];
            if (right < pair[0]) { return left + pair[1]; } 
        }
        return left + '000';
    }

    gridNodeString = (lat, lon) => {
      let lat_str = this.adjustNodePrecision(lat, 3);
      let lon_str = this.adjustNodePrecision(lon, 3);
      return lon_str + '-' + lat_str;
    }

    @observable address = this.default_location.address;
    @observable location_id = this.default_location.id;
    @observable lat = this.default_location.lat;
    @observable lon = this.default_location.lon;
    @observable node = this.default_location.node;

    @computed get locations() { return this.location_cache; }

    mappableLocations() {
      let mappable = this.location_cache;
      for (let key in mappable) {
        let loc_obj = mappable[key];
        if (Object.keys(loc_obj).indexOf('lng') === -1) {
          loc_obj['lng'] = loc_obj.lon;
        }
        mappable[key] = loc_obj;
      }
      return mappable;
    }

    @action select = (key) => {
      console.log('TurfLocationStore.select new key : ' + key);
      console.log('                    previous key : ' + this.selected)
      if (key !== this.selected) {
        let loc_obj = this.location_cache[key];
        if (Object.keys(loc_obj).indexOf('lon') === -1) {
          loc_obj['lon'] = loc_obj['lng'];
        }
        if (Object.keys(loc_obj).indexOf('node') === -1) {
          loc_obj['node'] = this.gridNodeString(loc_obj.lat, loc_obj.lon);
        }
        console.log('    selected address : ' + loc_obj.address)
        this.selected = loc_obj.id;
        console.log('    selected node : ' + loc_obj.node + ' (' + loc_obj.lat + ' , ' + loc_obj.lon + ')') 

        this.updateLocationDetails(loc_obj);
        return true
      }
      return false;
    }

    @action update = (context) => {
      console.log('TurfLocationStore.update was called')
      console.log('TurfLocationStore.update previously selected = ' + this.selected)
      // replace content in local storage each time locations are deleted
      let replace = context.deleted.length > 0;

      // add parametrs needed by App to those returned by the map dialog
      if (context.added.length > 0) {
        let num_added = context.added.length;
        for (let i=0; i < num_added; i++) {
          let key = context.added[i];
          console.log('TurfLocationStore.update context info for new location : ' + key)
          let loc_obj = context.locations[key];
          loc_obj['lon'] = loc_obj['lng'];
          loc_obj['node'] = this.gridNodeString(loc_obj.lat, loc_obj.lng);
          context.locations[key] = loc_obj;
        }
        replace = true;
      }

      if (replace) {
        console.log('TurfLocationStore.update replacing location_cache')
        this.location_cache = context.locations;
        // for local use, it's much faster to replace all locations than to
        // tell the location storage manager everything that happened
        console.log('TurfLocationStore.update calling location_manager.replaceAllLocations')
        this.location_manager.replaceAllLocations(this.location_cache);
      }

      // check whether a different location was selected 
      if (this.select(context.selected)) {
        let content_model = this.stores.appstore.contentModel;
        if (content_model !== null && content_model !== typeof undefined) {
            console.log('TurfLocationStore.update requesting data download')
            this.stores.appstore.downloadModelContent(null);
        }
        console.log('TurfLocationStore.update calling location_manager.setSelected')
        this.location_manager.setSelected(context.selected);
      }
    }

    updateLocationDetails = (loc_obj) => {
      this.address = loc_obj.address;
      this.location_id = loc_obj.id;
      this.lat = loc_obj.lat;
      this.lon = loc_obj.lon;
      this.node = loc_obj.node;
    }

  // MAP DIALOG CONTROL FUNCTIONS

  // Initialize the map dialog
  @action initMapDialog = () => {
    let jQuery = window.jQuery;
    console.log('\n\nTurfLocationStore initializing LocationMapDialog');
    console.log('jQuery : ' + typeof jQuery);
    let options = { width:600, height:500, default:this.default_location }
    console.log('jQuery(".location-map-dialog").NRCCLocationMapDialog : ' + typeof jQuery(".location-map-dialog").NRCCLocationMapDialog)
    console.log('\n\n');
    jQuery(".location-map-dialog").NRCCLocationMapDialog(options);
    this.map_dialog = jQuery(".location-map-dialog").NRCCLocationMapDialog();
    this.map_dialog('google',window.google)
    this.map_dialog("bind", "close", (ev, context) => { this.update(context); });
  }

  // Open map with all saved locations
  @action openMap = () => {
    if (this.map_dialog === null) { this.initMapDialog(); }
    this.map_dialog('bind', 'close', this.mapDialogWasClosed, this);
    this.map_dialog("locations", this.mappableLocations());
    this.map_dialog("open", this.selected);
  }

}

