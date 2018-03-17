import React from 'react';
import { inject, observer } from 'mobx-react';

import "../../styles/dashboard.css";
import DashboardDescription from '../../components/dbdescription.js';
import DashboardLocation from '../../components/dblocation.js';
import DashboardTitle from '../../components/dbtitle.js';

/*
import ControlColumnChart from '../components/controlchart.jsx';
*/
import ControlsDashboardTable from './dbtable.js';
import ControlsDashboardThumbs from './dbthumbs.js';

@inject("stores")
@observer
class TurfControlsDashboard extends React.Component {

  render() {
    return (
      <div id="turf-dashboard">
        <DashboardLocation/>
        <DashboardTitle />
        <div id="turf-dashboard-elements">
          <ControlsDashboardTable />
          <div>&nbsp;</div>
          <ControlsDashboardThumbs />
        </div>
        <DashboardDescription />
      </div>
    )
  }
}

export default TurfControlsDashboard;


