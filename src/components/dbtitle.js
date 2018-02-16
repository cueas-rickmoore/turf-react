import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class DashboardTitle extends React.Component {

  render() {
    return (
      <div className="dashboard-title">{this.props.store.model.data_model.dbtitle}</div>
    )
  }
}

export default DashboardTitle;
