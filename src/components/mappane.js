import React from 'react';
import { inject, observer } from 'mobx-react';

import "../styles/dashboard.css";
import "../styles/mappane.css";
import ExternalMapPane from '../components/external/mappane.js';
import ThreatMapPane from '../components/threats/mappane.js';
import TreatmentMapPane from '../components/controls/mappane.js';


@inject("stores")
@observer
class TurfMapContentPane extends React.Component {

  render() {

    console.log('TurfMapContentPane for "' + this.props.stores.appstore.contentGroup + '"')

    if (this.props.stores.appstore.contentGroup === 'threats') {
      return (
        <div id="turf-dashboard">
          <ThreatMapPane />
        </div>
      )
    } else if (this.props.stores.appstore.contentGroup === 'controls') {
      return (
        <div id="turf-dashboard">
          <TreatmentMapPane />
        </div>
      )
    } else if (this.props.stores.appstore.contentGroup === 'external') {
      return (
        <div id="turf-dashboard">
          <ExternalMapPane />
        </div>
      )
    }
  }
}

export default TurfMapContentPane;


