import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class DashboardTitle extends React.Component {

  render() {
    let stores = this.props.stores
    let model = stores.models.model(stores.datastore.model_name);
    return (
      <div className="dashboard-title">{model.description}</div>
    )
  }
}

export default DashboardTitle;
