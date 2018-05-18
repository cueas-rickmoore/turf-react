import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
class DashboardButton extends React.Component {
  clickHandler(model_name) {
    let component = { component:'dashboard', contentGroup:'controls', contentModel:model_name, contentKey:null }
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
class MapButton extends React.Component {
  clickHandler(treatment_key) {
    let model = this.props.stores.models.model;
    let component = { component:'maps', contentGroup:'controls', contentModel:model.name, contentKey:treatment_key }
    this.props.stores.appstore.updateContentPane(component);
  }

  render() {
    let text = "View map for " + this.props.stores.models.model.treatments[this.props.treatment_key].fullname;
    return <span className="map-swap-button" onClick={this.clickHandler.bind(this, this.props.treatment_key)}>{text}</span>
  }
}


@inject("stores")
@observer
class TreatmentMapImage extends React.Component {

  render() {
    let model = this.props.stores.models.model;
    let content_key = this.props.stores.appstore.contentKey;
    let treatment = model.treatments[content_key];

    let map_date = this.props.stores.datestore.mapDate;
    let alt_date = map_date.format('MMMM Do Y');
    let url_date = map_date.format('YMMDD');

    let alt = model.dashboard.altString.replace('ALTDATE',alt_date)
                   .replace('/TREATMENT/gi',treatment.fullname);
    let url = this.props.stores.appstore.urlTemplate(model,'maps')
                  .replace('YEAR', map_date.format('Y'))
                  .replace('DATESTR', url_date)
                  .replace(/TREATMENT/gi, treatment.fullname);

    let treatments = [ ];
    model.sequence.map(function(treatment,i) {
      if (treatment !== content_key) { treatments.push(treatment) }
    });

    return (
      <div id="turf-map-image">
        <img className="fullsizemap" src={url} alt={alt} />
        <div className="content-below-map-image">
          <DashboardButton />
          { treatments.map(function(treatment_key,i) {
              let button = 'map-button-' + i.toString();
              return <MapButton key={button} className="map-swap-button" treatment_key={treatment_key} />
          })}
        </div>
      </div>
    )
  }
}

export default TreatmentMapImage;

