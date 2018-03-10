import React from 'react';
import { inject, observer } from 'mobx-react';

import "../styles/dashboard.css";
import "../styles/mappane.css";
import DashboardDescription from '../components/dbdescription.js';
import DashboardLocation from '../components/dblocation.js';
import TreatmentMapImage from '../components/treatmapimage.js';
import TreatmentMapThumbnails from '../components/treatmapthumbs.js';
import TurfMapImage from '../components/mapimage.js';
import TurfMapThumbnails from '../components/mapthumbs.js';


@inject("stores")
@observer
class TurfMapContentPane extends React.Component {

  render() {
    console.log('TurfMapContentPane.render : this.props.stores.appstore.contentKey = ' + this.props.stores.appstore.contentKey)
    if (this.props.stores.appstore.contentKey === null) {
      return (
        <div id="turf-dashboard">
          <DashboardLocation/>
          <div id="turf-map-pane">
            <TurfMapImage />
            <TurfMapThumbnails />
          </div>
          <DashboardDescription />
        </div>
      )
    } else {
      return (
        <div id="turf-dashboard">
          <DashboardLocation/>
          <div id="turf-map-pane">
            <TreatmentMapImage />
            <TreatmentMapThumbnails />
          </div>
          <DashboardDescription />
        </div>
      )
    }
  }
}

export default TurfMapContentPane;


