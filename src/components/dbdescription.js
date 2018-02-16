import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class DashboardDescription extends React.Component {

  description() { return { __html: this.props.store.text.description() }; }

  render() {
    return (<div className="dashboard-description" dangerouslySetInnerHTML={this.description()} />)
  }
}

export default DashboardDescription;
