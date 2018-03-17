import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
class HomePageMap extends React.Component {

  clickHandler() {
      let content_keys = { component:"dashboard", contentGroup:"threats", contentModel:this.props.model, contentKey:null };
      this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    console.log('HomePageMap.render model = ' + this.props.model)
    let model = this.props.stores.models.modelFromName(this.props.model);
    let model_name = model.fullname;

    let map_date = this.props.stores.datestore.doi;
    let alt_date = map_date.format('MMMM Do Y');
    let url_date = map_date.format('YMMDD');

    let alt = model.dashboard.altString.replace('ALTDATE',alt_date);
    let url = model.urls.maps.replace('YEAR', map_date.format('Y'))
                             .replace('DATESTR', url_date);

    return (
      <div className="home-map-container">
        <img className="home-page-map" src={url} alt={alt} onClick={this.clickHandler.bind(this)} />
        <div className="home-map-label">Click map view dashboard for {model_name}</div>
      </div>
    )
  }
}

class TurfHomeContentPane extends React.Component {

  render() {

    return (
       <div id="turf-home-page">
         <div className="home-maps-container">
           <HomePageMap model={"anthrac"} />
           <HomePageMap model={"bpatch"} />
         </div>
         <div className="home-maps-container">
           <HomePageMap model={"dspot"} />
           <HomePageMap model={"pblight"} />
         </div>
       </div>
    );
  }
}

export default TurfHomeContentPane;

