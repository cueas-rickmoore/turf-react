import React from 'react';
import { inject, observer } from 'mobx-react';

import TurfNavigation from './components/navigation.js';
import TurfControlsDashboard from './components/controls/dashboard.js';
import TurfHomeContentPane from './components/homepane.js';
import TurfMapContentPane from './components/mappane.js';
import TurfModelDashboard from './components/dashboard.js';
import NRCCFooter from './components/nrccfooter.js';
import './App.css';

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
    return (
      <div className="App">
        <header className="App-header">
          <img src="images/turf-banner.jpg" className="App-banner" alt="Turf Banner" />
          <p className="App-title">Turf Grass Management</p>
        </header>
        <div id="App-content">
          <div id="navigation-pane"><TurfNavigation /></div>
          <div id="content-pane">
            { appstore.contentComponent === 'home' && <TurfHomeContentPane /> }
            { appstore.contentComponent === 'dashboard' &&
              datastore.data && <TurfModelDashboard />  }
            { appstore.contentComponent === 'maps' &&
              appstore.contentGroup === 'control' &&
              datastore.data && <TurfMapContentPane />  }
            { appstore.contentComponent === 'maps' &&
              appstore.contentGroup === 'threats' &&
              datastore.data && <TurfMapContentPane />  }

            { appstore.contentComponent === 'maps' && <TurfMapContentPane /> }

            { !root_components.includes(appstore.contentComponent) && <UnsupportedComponentType /> }
            <div>&nbsp;</div>
          </div>
        </div>
        <NRCCFooter />
      </div>
    );
  }
}

export default App;
