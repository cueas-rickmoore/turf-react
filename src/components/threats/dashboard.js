import React from 'react';
import { inject, observer } from 'mobx-react';

import "../../styles/dashboard.css";
import ThreatColumnChart from '../../components/threats/dbchart.js';
import DashboardDescription from '../../components/dbdescription.js';
import DashboardLocation from '../../components/dblocation.js';
import ThreatDashboardTable from '../../components/threats/dbtable.js';
import ThreatDashboardThumbnails from '../../components/threats/dbthumbs.js';
import DashboardTitle from '../../components/dbtitle.js';

@inject("stores")
@observer
class TurfThreatDashboard extends React.Component {
  render() {
    console.log('\n\nATTEMPTING TO RENDER TurfThreatDashboard')
    return (
      <div id="turf-dashboard">
        <DashboardLocation/>
        <DashboardTitle />
        <div id="turf-dashboard-elements">
          <ThreatDashboardTable />
          <div>&nbsp;</div>
          <ThreatColumnChart />
          <div>&nbsp;</div>
          <ThreatDashboardThumbnails />
        </div>
        <DashboardDescription />
      </div>
    )
  }
}

export default TurfThreatDashboard;


