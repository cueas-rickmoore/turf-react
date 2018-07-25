import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
class ThreatThumbnail extends React.Component {
  clickHandler(the_date, model) {
    this.props.stores.datestore.updateMapDate(the_date);
    this.props.stores.appstore.uriToContentPane('maps/threats/' + model);
  }

  render() {
    let model = this.props.model;
    let content_key = this.props.stores.appstore.contentKey;

    let the_date = this.props.the_date;
    let alt_date = the_date.format('MMMM Do Y');
    let date_string = the_date.format('YMMDD');
    let label = the_date.format('MM/DD/YY');

    let alt = 'link to ' + model.dashboard.altString.replace('ALTDATE',alt_date);
    let url = this.props.stores.appstore.urlTemplate(model,'thumbs').replace('YEAR',the_date.format('Y')).replace('DATESTR',date_string);
    if (content_key) {
        alt = alt.replace(/CONTENTKEY/gi, content_key);
        url = url.replace(/CONTENTKEY/gi, content_key);
    }
    return(
      <div key={'tmb' + date_string} className="thumb" onClick={this.clickHandler.bind(this, the_date, model.name)}>
        <img key={'tmbimg' + date_string} className="thumbnail" src={url} alt={alt} />
        <br/><span key={'tmblbl' + date_string} className="thumbnail-date">{label}</span>
      </div>
    )
  }
}

@inject("stores")
@observer
class ThreatDashboardThumbnails extends React.Component {

  render() {
    let model = this.props.stores.models.model;
    let start_date = this.props.stores.datestore.firstThumbDate.clone();
    let thumb_dates = [start_date, ];
    for (let i=1; i < model.dashboard.thumbs.count; i++) {
        thumb_dates.push(start_date.clone().add(i, 'd'));
    }

    return (
      <div className="turf-dashboard-thumbnails">
        { thumb_dates.map(function(the_date,i){
          let key = 'threats_thumb_' + i;
          return <ThreatThumbnail key={key} model={model} the_date={the_date} />;
        }) }
      </div>
    )
  }
}

export default ThreatDashboardThumbnails;
