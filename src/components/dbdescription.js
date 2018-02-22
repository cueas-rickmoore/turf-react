import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class DashboardDescription extends React.Component {

  description(model_name) { return { __html: this.props.stores.text.description(model_name) }; }

  render() {
    let model_name = this.props.stores.datastore.model_name;
    return (<div className="dashboard-description" dangerouslySetInnerHTML={this.description(model_name)} />)
  }
}

export default DashboardDescription;
