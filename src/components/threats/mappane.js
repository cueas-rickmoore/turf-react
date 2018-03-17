import React from 'react';
import { observer } from 'mobx-react';

import "../../styles/dashboard.css";
import "../../styles/mappane.css";
import DashboardDescription from '../../components/dbdescription.js';
import DashboardLocation from '../../components/dblocation.js';
import ThreatMapImage from '../../components/threats/mapimage.js';
import ThreatMapThumbnails from '../../components/threats/mapthumbs.js';


@observer
class ThreatMapPane extends React.Component {

  render() {
    return (
      <div id="turf-map-pane">
        <DashboardLocation />
        <ThreatMapImage />
        <ThreatMapThumbnails />
        <DashboardDescription />
      </div>
    )
  }
}

export default ThreatMapPane;


