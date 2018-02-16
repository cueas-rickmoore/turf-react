import React from 'react';
import { inject, observer } from 'mobx-react';

import "../styles/dashboard.css";
import DashboardColumnChart from '../components/dbchart';
import DashboardDescription from '../components/dbdescription';
import DashboardLocation from '../components/dblocation';
import DashboardTable from '../components/dbtable';
import DashboardThumbnails from '../components/dbthumbs';
import DashboardTitle from '../components/dbtitle';

@inject("store")
@observer
class TurfDashboardComponent extends React.Component {

  render() {
    return (
      <div id="turf-dashboard">
        <DashboardLocation/>
        <DashboardTitle />
        <div id="turf-dashboard-elements">
          <DashboardTable />
          <div>&nbsp;</div>
          <DashboardColumnChart />
          <div>&nbsp;</div>
          <DashboardThumbnails />
        </div>
        <DashboardDescription />
      </div>
    )
  }

}

export default TurfDashboardComponent;
