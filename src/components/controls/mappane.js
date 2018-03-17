import React from 'react';
import { observer } from 'mobx-react';

import "../../styles/dashboard.css";
import "../../styles/mappane.css";
import DashboardDescription from '../../components/dbdescription.js';
import DashboardLocation from '../../components/dblocation.js';
import TreatmentMapImage from '../../components/controls/mapimage.js';
import TreatmentMapThumbnails from '../../components/controls/mapthumbs.js';

@observer
class TreatmentMapPane extends React.Component {
          
  render() {
    return (
      <div id="turf-map-pane">
        <DashboardLocation/>
        <TreatmentMapImage />
        <TreatmentMapThumbnails />
        <DashboardDescription />
      </div>
    )
  }
}

export default TreatmentMapPane;


