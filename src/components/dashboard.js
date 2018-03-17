import React from 'react';
import { inject, observer } from 'mobx-react';

import TurfControlsDashboard from '../components/controls/dashboard.js';
import TurfThreatDashboard from '../components/threats/dashboard.js';

@inject("stores")
class UnsupportedContentGroup extends React.Component {
  render() {
    const appstore = this.props.stores.appstore;
    return (
      <div id="turf-unsupported-content">
        <div className="turf-content-warning">
          "{ appstore.contentgroup }" is not recognized as a valid content group
        </div>
      </div>
    );
  }
}


@inject("stores")
@observer
class TurfModelDashboard extends React.Component {

  render() {
    let datastore = this.props.stores.datastore;
    let appstore = this.props.stores.appstore;
    console.log('TurfModelDashboard.render contentGroup="' + appstore.contentGroup + '" content_model="' + appstore.contentModel)
    return (
      <div id="turf-dashboard">
        { appstore.contentGroup === 'controls' && datastore.data && <TurfControlsDashboard />  }
        { appstore.contentGroup === 'threats' && datastore.data && <TurfThreatDashboard />  }
        { appstore.contentGroup !== 'controls' &&
          appstore.contentGroup !== 'threats' && <UnsupportedContentGroup /> }
      </div>
    )
  }
}

export default TurfModelDashboard;


