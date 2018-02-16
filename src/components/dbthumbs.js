import React from 'react';
import { inject, observer } from 'mobx-react';

class DashboardThumbnail extends React.Component {
  render() {
    let thumb = this.props.thumb;

    let div_key = 'tmb' + thumb.key_string;
    let img_key = 'tmbimg' + thumb.key_string;
    let span_key = 'tmblbl' + thumb.key_string;
    /* console.log('in tumbnail : div=' + div_key +', img=' + img_key + ', span=' + span_key) */
    return(
      <div key={div_key} className="thumb">
         <img key={img_key} className="thumbnail" src={thumb.url} alt={thumb.alt} />
         <br/><span key={span_key} className="thumbnail-date">{thumb.label}</span>
      </div>
    )
  }
}

@inject("store")
@observer
class DashboardThumbnails extends React.Component {

  render() {
    let store = this.props.store.model;
    let thumb_model = store.data_model.dbthumbs;
    let thumb_url = store.data_model.urls.thumbs;
    let start_date = store.model_dates.doi;
    let thumb_dates = [start_date, ];
    for (let i=1; i < thumb_model.count; i++) {
        thumb_dates.push(start_date.clone().add(i, 'd'));
    }

    return (
      <div className="turf-dashboard-thumbnails">
        { thumb_dates.map(function(the_date,i){
          let label_date = the_date.format('MM/DD/YY');
          let full_date = the_date.format('YYYYMMDD');
          let thumb = { alt: thumb_model.altString.replace('SLASHED', label_date),
                        key_string: full_date,
                        label: label_date,
                        url: thumb_url.replace('YEAR', the_date.year().toString()).replace('DATESTR', full_date),
                      }
          /* console.log('in parent : key string = ' + thumb.key_string) */

          return <DashboardThumbnail thumb={thumb} />;
          })
        }
      </div>
    )
  }
}

export default DashboardThumbnails;
