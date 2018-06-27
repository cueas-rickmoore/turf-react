import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
class TreatmentThumbnail extends React.Component {

  clickHandler(the_date, model, treatment) {
    this.props.stores.datestore.updateMapDate(the_date);
    this.props.stores.appstore.uriToContentPane('maps/controls/' + model + '/' + treatment);
  }

  render() {
    let model = this.props.stores.models.model;
    let treatment_key = this.props.treatment_key;
    let treatment = model.treatments[treatment_key];

    let the_date = this.props.the_date;
    let alt_date = the_date.format('MMMM Do Y');
    let key_date = the_date.format('MMDDY');
    let label = the_date.format('MM/DD/YY');

    let template = model.dashboard.altString;
    let alt = 'link to ' + template.replace('ALTDATE',alt_date)
                                   .replace('TREATMENT',treatment.fullname);
    let url = this.props.stores.appstore.urlTemplate(model,'thumbs')
                  .replace('DATESTR',the_date.format('YMMDD'))
                  .replace(/TREATMENT/gi,treatment.fullname)
                  .replace('YEAR',the_date.format('Y'));

    return (
      <div key={'tmb' + key_date} className="thumb" onClick={this.clickHandler.bind(this, the_date, model.name, treatment_key)}>
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
    let treatment_key = this.props.treatment_key;
    let treatment_name = model.treatments[treatment_key].fullname;

    let start_date = this.props.stores.datestore.firstThumbDate.clone();
    let thumb_dates = [start_date, ];
    for (let i=1; i < model.dashboard.thumbs.count; i++) {
        thumb_dates.push(start_date.clone().add(i, 'd'));
    }

    let group_key = 'control_thumbnails_' + this.props.count; 
    return (
      <div className="turf-treatment-group" key={group_key}>
        <div className="turf_treatment-name">{treatment_name} Maps</div>
        <div className="turf-dashboard-thumbnails">
          { thumb_dates.map(function(the_date,i){
            let key = 'control_thumb_' + i;
            return <TreatmentThumbnail key={key} the_date={the_date} treatment_key={treatment_key} />;
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

    return (
      <div className="turf-dashboard-thumbnails">
        { model.sequence.map(function(name,i){
          let dbt_key = 'db-thumb-' + i;
          return <TreatmentThumbnails key={dbt_key} count={i} treatment_key={name} />;
        }) }
      </div>
    )
  }
}

export default ControlsDashboardThumbs;
