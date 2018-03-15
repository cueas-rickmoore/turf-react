import React from 'react';
import { inject, observer } from 'mobx-react';

import TurfNavigation from './components/navigation.js';
/* import TurfNavigationDrawer from './components/navdrawer.js'; */
/* import TurfNavigationPanel from './components/navpanel.js'; */
import TurfControlDashboard from './components/controlboard.js';
import TurfHomeContentPane from './components/homepane.js';
import TurfMapContentPane from './components/mappane.js';
import TurfThreatDashboard from './components/threatboard.js';
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
   
  render() {
    let appstore = this.props.stores.appstore;
    let datastore = this.props.stores.datastore;

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
            { appstore.contentComponent === 'controls' && datastore.data && <TurfControlDashboard />  }
            { appstore.contentComponent === 'maps' && <TurfMapContentPane /> }
            { appstore.contentComponent === 'threats' && datastore.data && <TurfThreatDashboard />  }
            { appstore.contentComponent !== 'controls' &&
              appstore.contentComponent !== 'home' &&
              appstore.contentComponent !== 'maps' &&
              appstore.contentComponent !== 'threats' && 
              <UnsupportedComponentType /> }
            <div>&nbsp;</div>
          </div>
        </div>
        <NRCCFooter />
      </div>
    );
  }
}

export default App;
