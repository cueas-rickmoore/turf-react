import React from 'react';
import { inject, observer } from 'mobx-react';
import scriptLoader from 'react-async-script-loader';

import TurfNavigation from './components/navigation.js';
import TurfHomeContentPane from './components/homepane.js';
import TurfMapContentPane from './components/mappane.js';
import TurfModelDashboard from './components/dashboard.js';
import NRCCFooter from './components/nrccfooter.js';
import './App.css';

import jQuery from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/button.css';
import 'jquery-ui/themes/base/dialog.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/button';
import 'jquery-ui/ui/widgets/dialog';
import './styles/location-dialog.css';
window.jQuery = jQuery;

@inject("stores")
class UnsupportedComponentType extends React.Component {
  render() {
    const appstore = this.props.stores.appstore;
    return (
      <div id="turf-unsupported-content">
        <div className="turf-content-warning">
          "{ appstore.contentComponent }" is not a supported content type
        </div>
      </div>
    );
  }
}

const HOST = 'https://maps.google.com/maps/api/js';
const KEY = 'AIzaSyDv5pQYe9kRbolVUt0o8XSXSQl4g8BHrrQ';
const URL_google_api = `${HOST}?key=${KEY}`;

const LOC_DIALOG_PATH = process.env.REACT_APP_COMMON_URL + '/js/location-dialog.js';
console.log('LOC_DIALOG_PATH = ' + LOC_DIALOG_PATH)
@scriptLoader([URL_google_api, LOC_DIALOG_PATH])
@inject("stores")
@observer
class App extends React.Component {

  constructor(props) {
    super(props);
    this.root_components = ['dashboard','home','maps']
  }
   
  render() {
    let appstore = this.props.stores.appstore;
    let datastore = this.props.stores.datastore;
    let root_components = this.root_components;

    console.log('\n\ncontentComponent = ' + appstore.contentComponent);
    console.log('    contentModel = ' + appstore.contentModel);
    console.log('      contentKey = ' + appstore.contentKey + '\n\n');
    
    let banner_url = this.props.stores.appstore.imageUrl('turf-banner.jpg');

    return (
      <div className="App">
        <header className="App-header">
          <img src={banner_url} className="App-banner" alt="Turf Banner" />
          <p className="App-title">Turf Grass Management</p>
        </header>
        <div id="App-content">
          <div id="navigation-pane"><TurfNavigation /></div>
          <div id="content-pane">
            { appstore.contentComponent === 'home' && <TurfHomeContentPane /> }
            { appstore.contentComponent === 'dashboard' &&
              datastore.data && <TurfModelDashboard />  }
            { appstore.contentComponent === 'maps' && <TurfMapContentPane /> }
            { !root_components.includes(appstore.contentComponent) &&
              <UnsupportedComponentType /> }
            <div>&nbsp;</div>
          </div>
        </div>
        <NRCCFooter />
        <div className="location-map-dialog">
        </div>
      </div>
    );
  }
}

export default App;
