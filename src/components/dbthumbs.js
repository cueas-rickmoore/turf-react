import React from 'react';
import { inject, observer } from 'mobx-react';

class DashboardThumbnail extends React.Component {
  render() {
    let thumb = this.props.thumb;

    let div_key = 'tmb' + thumb.key_string;
    let img_key = 'tmbimg' + thumb.key_string;
    let span_key = 'tmblbl' + thumb.key_string;
    return(
      <div key={div_key} className="thumb">
         <img key={img_key} className="thumbnail" src={thumb.url} alt={thumb.alt} />
         <br/><span key={span_key} className="thumbnail-date">{thumb.label}</span>
      </div>
    )
  }
}

@inject("stores")
@observer
class DashboardThumbnails extends React.Component {

  render() {
    const model_dates = this.props.stores.modeldata.modelDates;
    let model = this.props.stores.models.model(this.props.stores.modeldata.model_name);

    let thumb_model = model.dashboard.thumbs;
    let thumb_url = model.urls.thumbs;
    let start_date = model_dates.doi;
    if (!start_date) {
        start_date = model_dates.endDate.clone().subtract(model.thumbs.count-1, 'd')
    }
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

          return <DashboardThumbnail thumb={thumb} />;
          })
        }
      </div>
    )
  }
}

export default DashboardThumbnails;
