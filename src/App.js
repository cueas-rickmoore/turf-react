import React from 'react';
import { inject, observer } from 'mobx-react';

import TurfNavigation from './components/navigation.js';
import TurfDashboard from './components/dashboard.js';
import NRCCFooter from './components/nrccfooter.js';
import './App.css';

@inject("stores")
class UnsupportedComponentType extends React.Component {
  render() {
    return (
      <div id="turf-unsupported-content">
        <div className="turf-content-warning">
          "{ this.props.stores.contentComponent }" is not a supported content type
        </div>
      </div>
    );
  }
}


@inject("stores")
@observer
class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="images/turf-banner.jpg" className="App-banner" alt="Turf Banner" />
          <p className="App-title">Turf Grass Management</p>
        </header>
        <div id="App-content">
          <div id="navigation-pane"><TurfNavigation /></div>
          <div id="content-pane">
            { this.props.stores.contentComponent === 'dashboard' && <TurfDashboard /> }
            { this.props.stores.contentComponent !== 'dashboard' && <UnsupportedComponentType /> }
            <div>&nbsp;</div>
          </div>
        </div>
        <NRCCFooter />
      </div>
    );
  }
}

export default App;
