import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
class TreatmentThumbnail extends React.Component {
  clickHandler(the_date, model, treatment) {
    this.props.stores.datestore.updateMapDate(the_date);
    let component = { component:'maps', contentGroup:'controls', contentModel:model.name, contentKey:treatment }
    this.props.stores.appstore.updateContentPane(component);
  }

  render() {
    let model = this.props.stores.models.model;
    let treatment = model.treatments[this.props.treatment];

    let the_date = this.props.the_date;
    let alt_date = the_date.format('MMMM Do Y');
    let key_date = the_date.format('MMDDY');
    let label = the_date.format('MM/DD/YY');

    let template = model.dashboard.altString;
    let alt = 'link to ' + template.replace('ALTDATE',alt_date)
                                   .replace('TREATMENT',treatment.fullname);
    let url = model.urls.thumbs.replace('DATESTR',the_date.format('YMMDD'))
                               .replace(/TREATMENT/gi,treatment.fullname)
                               .replace('YEAR',the_date.format('Y'));

    return(
      <div key={'tmb' + key_date} className="thumb" onClick={this.clickHandler.bind(this, the_date, model, this.props.treatment)}>
        <img key={'tmbimg' + key_date} className="thumbnail" src={url} alt={alt} />
        <br/><span key={'tmblbl' + key_date} className="thumbnail-date">{label}</span>
      </div>
    )
  }
}

@inject("stores")
@observer
class TreatmentThumbnails extends React.Component {

  render() {
    let model = this.props.stores.models.model;
    let treatment = this.props.treatment;

    let start_date = this.props.stores.datestore.firstThumbDate.clone();
    let thumb_dates = [start_date, ];
    for (let i=1; i < model.dashboard.thumbs.count; i++) {
        thumb_dates.push(start_date.clone().add(i, 'd'));
    }

    return (
      <div className="turf-treatment-group">
        <div className="turf_treatment-name">{treatment} Maps</div>
        <div className="turf-dashboard-thumbnails">
          { thumb_dates.map(function(the_date,i){
            return <TreatmentThumbnail the_date={the_date} treatment={treatment} />;
          }) }
        </div>
      </div>
    )
  }
}

@inject("stores")
@observer
class ControlsDashboardThumbs extends React.Component {

  render() {
    let model = this.props.stores.models.model;
    console.log('ControlDashboardThumbnails sequence ' + model.sequence)

    return (
      <div className="turf-dashboard-thumbnails">
        { model.sequence.map(function(name,i){
          return <TreatmentThumbnails treatment={name} />;
        }) }
      </div>
    )
  }
}

export default ControlsDashboardThumbs;
