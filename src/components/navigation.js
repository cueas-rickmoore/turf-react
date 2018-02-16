
import React from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/navigation.css';
/* import fetch from 'isomorphic-fetch'; */


class InactiveMenuTitle extends React.Component {
  render() {
    return (
      <div className="turf-inactive-menu">
        <div className="turf-inactive-menu-title">{this.props.title}</div>
      </div>
    );
  }
}

@inject("store") @observer
class DiseaseRiskMenu extends React.Component {

  clickHandler(data_keys) { this.props.store.turf.updatePageType(data_keys) }

  render() {
    return (
      <div clasName="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-diseases" className="turf-nav-items">
          <button id="anthrac" className="turf-nav-button" onClick={this.clickHandler.bind(this, ("dashboard","anthrac"))}>Anthracnose</button>
          <button id="bpatch" className="turf-nav-button" onClick={this.clickHandler.bind(this, ("dashboard","bpatch"))}>Brown Patch</button>
          <button id="dspot" className="turf-nav-button" onClick={this.clickHandler.bind(this, ("dashboard","dspot"))}>Dollarspot</button>
          <button id="pblight" className="turf-nav-button" onClick={this.clickHandler.bind(this, ("dashboard","pblight"))}>Pythium Blight</button>
        </div>
      </div>
      );
    }
}


@inject("store") @observer
class TurfDevelopmentMenu extends React.Component {

  clickHandler(data_keys) { this.props.store.turf.updatePageType(data_keys) }

  render() {
    return (
      <div clasName="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-development" className="turf-nav-items">
          <button id="seedhead" className="turf-nav-button" onClick={this.clickHandler.bind(this, ("dashboard","seedhead"))}>Seedhead Recommendations</button>
          <button id="dandelion" className="turf-nav-button" onClick={this.clickHandler.bind(this, ("dashboard","dandelion"))}>Dandelion Recommendations</button>
        </div>
      </div>
      );
    }
}

class TurfIrrigationMenu extends React.Component {
  render() {
    return (
      <div clasName="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-irrigation" className="turf-nav-items">
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/rainfall.html" target="_blank" rel="noopener noreferrer">Last Week's Rainfall</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/pet.html" target="_blank" rel="noopener noreferrer">Evapotranspiration</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/moisture.html" target="_blank" rel="noopener noreferrer">Moisture Deficit</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/topsoil.html" target="_blank" rel="noopener noreferrer">USDA Topsoil Moisture</a></div>
        </div>
      </div>
      );
    }
}

class TurfTemperatureMenu extends React.Component {
  render() {
    return (
      <div clasName="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-temperature" className="turf-nav-items">
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/degreedays.html" target="_blank" rel="noopener noreferrer">GDD</a></div>
          <button id="hstress" className="turf-nav-button">Heat Stress Index</button>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/frost.html" target="_blank" rel="noopener noreferrer">Frost Occurrence</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/soiltemp.html" target="_blank" rel="noopener noreferrer">Soil Temperature</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/temps.html" target="_blank" rel="noopener noreferrer">Temperature Departure</a></div>
        </div>
      </div>
      );
    }
}

@inject("store") @observer
class TurfUsefulLinksMenu extends React.Component {
  render() {
    return (
      <div clasName="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-useful-links" className="turf-nav-items">
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/grassWeb_dd.html" target="_blank" rel="noopener noreferrer">Seasonal GDD Table</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/grassWeb_precip.html" target="_blank" rel="noopener noreferrer">Seasonal Precipitation Table</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/ny_pet.html" target="_blank" rel="noopener noreferrer">Weekly New York PET Table</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/regional/drought/drought.html" target="_blank" rel="noopener noreferrer">NRCC Northeast Drought Page</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/lawn_water/" target="_blank" rel="noopener noreferrer">NRCC Lawn Watering Page</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/lastweek_maps.html" target="_blank" rel="noopener noreferrer">Last Week's Maps</a></div>
        </div>
      </div>
      );
    }
}

class TurfRadarMenu extends React.Component {
  render() {
    return (
      <div clasName="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-radar" className="turf-nav-items">
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar.html" target="_blank" rel="noopener noreferrer">NWS NE Region</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_enx.html" target="_blank" rel="noopener noreferrer">Albany, NY</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_bgm.html" target="_blank" rel="noopener noreferrer">Binghamton, NY</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_box.html" target="_blank" rel="noopener noreferrer">Boston, MA</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_buf.html" target="_blank" rel="noopener noreferrer">Buffalo, NY</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_cxx.html" target="_blank" rel="noopener noreferrer">Burlington, VT</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_cbw.html" target="_blank" rel="noopener noreferrer">Caribou, ME</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_rlx.html" target="_blank" rel="noopener noreferrer">Charleston, WV</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_dox.html" target="_blank" rel="noopener noreferrer">Dover Air Force Base, DE</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_tyx.html" target="_blank" rel="noopener noreferrer">Montague, NY</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_dix.html" target="_blank" rel="noopener noreferrer">Mt. Holly, NJ</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_pbz.html" target="_blank" rel="noopener noreferrer">Pittsburgh, PA</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_gyx.html" target="_blank" rel="noopener noreferrer">Portland, ME</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_ccx.html" target="_blank" rel="noopener noreferrer">State College, PA</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_lwx.html" target="_blank" rel="noopener noreferrer">Sterling, VA</a></div>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/radar_okx.html" target="_blank" rel="noopener noreferrer">Upton, NY</a></div>
        </div>
      </div>
      );
    }
}

@inject("store") @observer
class TurfNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'selectecMenu':'',};
  }

  divClickHandler(menu_type) {
    if (this.state.selectedMenu === menu_type) {
      this.setState({'selectedMenu': null,});
    } else {
      this.setState({'selectedMenu': menu_type,});
    }
  }

  render() {
    let selectedMenu = this.state.selectedMenu;

    return (
      <div className="turf-navigation">
        <div className="turf-nav-menus">
          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "disease")}>
            { selectedMenu === "disease" && <DiseaseRiskMenu title="Disease Risk"/> }
            { selectedMenu !== "disease" && <InactiveMenuTitle title="Disease Risk"/> }
          </div>

          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "development")}>
            { selectedMenu === "development" && <TurfDevelopmentMenu title="Turf &amp; Weed Development" /> }
            { selectedMenu !== "development" && <InactiveMenuTitle title="Turf &amp; Weed Development" /> }
          </div>

          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "irrigation")}>
            { selectedMenu === "irrigation" && <TurfIrrigationMenu title="Irrigation Information" /> }
            { selectedMenu !== "irrigation" && <InactiveMenuTitle title="Irrigation Information" /> }
          </div>

          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "temperature")}>
            { selectedMenu === "temperature" && <TurfTemperatureMenu title="Temperature &amp; GDD" /> }
            { selectedMenu !== "temperature" && <InactiveMenuTitle title="Temperature &amp; GDD" /> }
          </div>

          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "useful")}>
            { selectedMenu === "useful" && <TurfUsefulLinksMenu title="Useful Links" /> }
            { selectedMenu !== "useful" && <InactiveMenuTitle title="Useful Links" /> }
          </div>
          
          <div className="turf-nav-menu">
            <div id="turf-weather" className="turf-nav-weather"><a href="http://forecast.weather.gov/MapClick.php?lat=42.4422&lon=-76.5002#.Wmnzpo6gMgs" target="_blank" rel="noopener noreferrer">Local Forecast</a></div>
          </div>

          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "radar")}>
            { selectedMenu === "radar" && <TurfRadarMenu title="Regional Radar" /> }
            { selectedMenu !== "radar" && <InactiveMenuTitle title="Regional Radar" /> }
          </div>
          <div id="turf-shortcutt-content">
            <a href="http://www.nrcc.cornell.edu/industry/grass/ShCUTTOrder.pdf" target="_blank" rel="noopener noreferrer">
            <img src="images/shortcutt.png" alt="ShortCutt logo"/><p>Click Here To Learn About ShortCUTT</p></a>
            <p>An In-Season Weekly Management Tool For All Turfgrass Managers</p>
          </div>

        </div>
      </div>
    );
  }
}

export default TurfNavigation;
