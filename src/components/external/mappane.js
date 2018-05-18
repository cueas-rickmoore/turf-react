import React from 'react';
import { inject, observer } from 'mobx-react';

import "../../styles/mappane.css";

@inject('stores')
@observer
class ExternalMapPane extends React.Component {

  description(group, key) {
    return { __html: this.props.stores.text.description(group+'.'+key) };
  }

  render() {
    let appstore = this.props.stores.appstore;
    let map_spec = this.props.stores.external.mapSpec(appstore.contentModel, appstore.contentKey);
    let description = this.description(appstore.contentModel, appstore.contentKey);

    return (
      <div>
        <div id="external-map-pane">
          <div className="external-map-title" >Irrigation Information</div>
          <div id="external-map-image">
            <img className="fullsizemap" src={map_spec.map_url} alt={map_spec.description} />
          </div>
        </div>
        <div className="dashboard-description" dangerouslySetInnerHTML={description} />
      </div>
    )
  }
}

export default ExternalMapPane;


