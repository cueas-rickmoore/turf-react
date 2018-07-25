
export default class StorageManager {

  getLocation(key) { // retrieve data for a single location
    console.log('StorageManager.gettLocation : ' + key);
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
    console.log('StorageManager.insertLocation : ' + key);
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
    console.log('StorageManager.removeLocation : ' + key);
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
    console.log('StorageManager.removeLocations : ' + stale_keys);
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

