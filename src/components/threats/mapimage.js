import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
class DashboardButton extends React.Component {
  clickHandler(model_name) {
    let component = { component:'dashboard', contentGroup:'threats', contentModel:model_name, contentKey:null }
    this.props.stores.appstore.updateContentPane(component);
  }

  render() {
    let model = this.props.stores.models.model;
    let text = "View " + model.fullname + " dashboard";
      ;
    return <span className="dashboard-view-button" onClick={this.clickHandler.bind(this, model.name)}>{text}</span>
  }
}


@inject("stores")
@observer
class ThreatMapImage extends React.Component {

  render() {
    let content_key = this.props.stores.appstore.contentKey;
    let model = this.props.stores.models.model;

    let map_date = this.props.stores.datestore.mapDate;
    let alt_date = map_date.format('MMMM Do Y');
    let url_date = map_date.format('YMMDD');

    let alt = model.dashboard.altString.replace('ALTDATE',alt_date)
    let url = this.props.stores.appstore.urlTemplate(model,'maps')
                  .replace('YEAR', map_date.format('Y'))
                  .replace('DATESTR', url_date)

    if (content_key !== null) {
        alt = alt.replace('CONTENTKEY',content_key);
        url = url.replace('CONTENTKEY',content_key);
    }

    return (
      <div id="turf-map-image">
        <img className="fullsizemap" src={url} alt={alt} />
        <div className="content-below-map-image">
          <DashboardButton />
        </div>
      </div>
    )
  }
}

export default ThreatMapImage;


