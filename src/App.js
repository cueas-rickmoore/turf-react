import React from 'react';
import TurfNavigation from './components/navigation.js';
import AnthracnoseRisk from './components/anthracnose.js';
import './App.css';

class App extends React.Component {
  state = {currentApp: "home"}

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
            <AnthracnoseRisk />
            <div>&nbsp;</div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
