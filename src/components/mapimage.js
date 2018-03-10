import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class TurfMapImage extends React.Component {

  render() {
    let content_key = this.props.stores.appstore.contentKey;
    let model = this.props.stores.models.model;

    let map_date = this.props.stores.datestore.mapDate;
    let alt_date = map_date.format('MMMM Do Y');
    let url_date = map_date.format('YMMDD');

    let alt = model.dashboard.altString;
    let url = model.urls.maps;
    if (content_key === null) {
        alt = alt.replace('ALTDATE',alt_date);
        url = url.replace('YEAR', map_date.format('Y'))
                 .replace('DATESTR', url_date);
    } else {
        alt = alt.replace('ALTDATE',alt_date)
                 .replace('CONTENTKEY',content_key);
        url = url.replace('YEAR', map_date.format('Y'))
                 .replace('DATESTR', url_date)
                 .replace('CONTENTKEY',content_key);
    }

    return (
      <div id="turf-map-image">
        <img className="fullsizemap" src={url} alt={alt} />
      </div>
    )
  }
}

export default TurfMapImage;


