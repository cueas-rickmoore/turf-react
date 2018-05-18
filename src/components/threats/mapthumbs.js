import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class ThreatMapThumbnail extends React.Component {

  clickHandler(model, the_date) {
    this.props.stores.datestore.updateMapDate(the_date);
    let component = { component:'maps', contentGroup:'threats', contentModel:model.name, contentKey:null }
    this.props.stores.appstore.updateContentPane(component);
  }

  render() {
    let model = this.props.model;
    let the_date = this.props.the_date;

    let label = the_date.format('MM/DD/YY');
    let url_date = the_date.format('YYYYMMDD');
    let alt = 'link to ' + model.full_name + ' map for ' + the_date.format('MM/DD/YYYY');
    let url = this.props.stores.appstore.urlTemplate(model,'thumbs')
                  .replace('YEAR', the_date.format('Y'))
                  .replace('DATESTR', url_date);

    return(
      <div className="map-thumb" onClick={this.clickHandler.bind(this, model, the_date)}>
        <img className="thumbnail" src={url} alt={alt} />
        <br/><span className="thumbnail-date">{label}</span>
      </div>
    )
  }
}

@inject("stores")
@observer
class ThreatMapThumbnails extends React.Component {

  render() {
    let model = this.props.stores.models.model;

    let map_date = this.props.stores.datestore.mapDate;
    let start_date = this.props.stores.datestore.firstThumbDate.clone();
    let the_dates = [ ];
    if (start_date.diff(map_date, 'd') !== 0) { the_dates.push(start_date); }
    for (let i=1; i < model.dashboard.thumbs.count; i++) {
        let the_date = start_date.clone().add(i, 'd');
        if (the_date.diff(map_date, 'd') !== 0) { the_dates.push(the_date); }
    }

    return (
      <div className="turf-map-thumbnails">
        { the_dates.map(function(the_date,i) {
          let key_string = 'mapthumb' + the_date.format('YMMDD');
          return <ThreatMapThumbnail key={key_string} the_date={the_date} model={model} />;
        }) }
      </div>
    )
  }
}

export default ThreatMapThumbnails;
