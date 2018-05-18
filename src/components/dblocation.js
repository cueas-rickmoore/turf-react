import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class DashboardLocation extends React.Component {
  render() {
    return (
      <div id="turf-dashboard-location">
        <span className="location-address">{this.props.stores.location.address}</span>
      </div>
    )
  }
}

export default DashboardLocation;
