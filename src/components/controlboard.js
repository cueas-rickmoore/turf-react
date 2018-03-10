import React from 'react';
import { inject, observer } from 'mobx-react';

import "../styles/dashboard.css";
import DashboardDescription from '../components/dbdescription.js';
import DashboardLocation from '../components/dblocation.js';
import DashboardTitle from '../components/dbtitle.js';

/*
import ControlColumnChart from '../components/controlchart.jsx';
*/
import DashboardTreatmentsTable from '../components/treatmnttable.js';
import DashboardTreatmentThumbs from '../components/treatmntthumbs.js';

@inject("stores")
@observer
class TurfControlDashboard extends React.Component {

  render() {
    return (
      <div id="turf-dashboard">
        <DashboardLocation/>
        <DashboardTitle />
        <div id="turf-dashboard-elements">
          <DashboardTreatmentsTable />
          <div>&nbsp;</div>
          <DashboardTreatmentThumbs />
        </div>
        <DashboardDescription />
      </div>
    )
  }
}

export default TurfControlDashboard;


