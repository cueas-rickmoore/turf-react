import React from 'react';
import { inject } from 'mobx-react';

@inject("stores")
class HomePageMap extends React.Component {

  clickHandler() { this.props.stores.appstore.uriToContentPane("dashboard/threats/" + this.props.model); }

  render() {
    console.log('HomePageMap.render model = ' + this.props.model)
    let model = this.props.stores.models.modelFromName(this.props.model);
    let model_name = model.fullname;

    let map_date = this.props.stores.datestore.doi;
    let alt_date = map_date.format('MMMM Do Y');
    let url_date = map_date.format('YMMDD');

    let alt = model.dashboard.altString.replace('ALTDATE',alt_date);
    let url = this.props.stores.appstore.urlTemplate(model,'maps')
                  .replace('YEAR', map_date.format('Y'))
                  .replace('DATESTR', url_date);
    console.log('HomePageMap url : ' + url)

    return (
      <div className="home-map-container">
        <img className="home-page-map" src={url} alt={alt} onClick={this.clickHandler.bind(this)} />
        <div className="home-map-label">Click map to view dashboard for {model_name}</div>
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

