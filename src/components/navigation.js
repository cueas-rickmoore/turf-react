
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


@inject("stores")
@observer
class DiseaseRiskMenu extends React.Component {

  clickHandler(model_name) {
    let content_keys = { component:"dashboard", contentGroup:'threats', contentModel:model_name };
    this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    console.log("DiseaseRiskMenu.render active = " + this.props.active)

    if (this.props.active === true) {
      return (
        <div key="disease-active" className="turf-active-menu">
          <div className="turf-active-menu-title">Disease Risk</div>
          <div id="turf-diseases" className="turf-active-menu-items">
            <button id="anthrac" className="turf-nav-button" onClick={this.clickHandler.bind(this, "anthrac")}>Anthracnose</button>
            <button id="bpatch" className="turf-nav-button" onClick={this.clickHandler.bind(this, "bpatch")}>Brown Patch</button>
            <button id="dspot" className="turf-nav-button" onClick={this.clickHandler.bind(this, "dspot")}>Dollarspot</button>
            <button id="pblight" className="turf-nav-button" onClick={this.clickHandler.bind(this, "pblight")}>Pythium Blight</button>
          </div>
        </div>
      );
    } else {
      return (
        <div key="disease-inactive" className="turf-inactive-menu">
          <div className="turf-inactive-menu-title">Disease Risk</div>
        </div>
      );
    }
  }
}


@inject("stores")
@observer
class TurfDevelopmentMenu extends React.Component {
  
  clickHandler(model_name) {
    let content_keys = { component:"dashboard", contentGroup:'controls', contentModel:model_name, content_key:null };
    this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    return (
      <div className="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-development" className="turf-nav-items">
          <button id="dandelion" className="turf-nav-button" onClick={this.clickHandler.bind(this, "dandelion")}>Dandelion Recommendations</button>
          <button id="seedhead" className="turf-nav-button" onClick={this.clickHandler.bind(this, "seedhead")}>Seedhead Recommendations</button>
        </div>
      </div>
      );
    }
}


@inject("stores")
class TurfIrrigationMenu extends React.Component {

  clickHandler(content) {
    let content_keys = { component:"maps", contentGroup:'external', contentModel:'irrigate', contentKey:content };
    this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    return (
      <div className="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-irrigation" className="turf-nav-items">
          <button id="rainfall" className="turf-nav-button" onClick={this.clickHandler.bind(this, "rainfall")}>Last Week's Rainfall</button>
          <button id="evapot" className="turf-nav-button" onClick={this.clickHandler.bind(this, "evapot")}>Evapotranspiration</button>
          <button id="moisdef" className="turf-nav-button" onClick={this.clickHandler.bind(this, "moisdef")}>Moisture Deficit Last 7 Days</button>
          <button id="moisdefcst" className="turf-nav-button" onClick={this.clickHandler.bind(this, "moisdefcst")}>Moisture Deficit 3-Day Forecast</button>
          <button id="soilmoist" className="turf-nav-button" onClick={this.clickHandler.bind(this, "soilmoist")}>USDA Topsoil Moisture - Currrent</button>
          <button id="soilcomp5" className="turf-nav-button" onClick={this.clickHandler.bind(this, "soilcomp5")}>USDA Topsoil Moisture - Currrent vs 5-year Mean</button>
          <button id="soilcomp10" className="turf-nav-button" onClick={this.clickHandler.bind(this, "soilcomp10")}>USDA Topsoil Moisture - Currrent vs 10-year Mean</button>
        </div>
      </div>
      );
    }
}


@inject("stores")
@observer
class TurfTemperatureMenu extends React.Component {

  clickHandler(content_type) {
      let content_keys = { };
      if (content_type === 'hstress') {
        content_keys = { component:"dashboard", contentGroup:"threats", contentModel:"hstress", contentKey:null }
      } else {
        let content = content_type.split('.')
        content_keys = { component:"maps", contentGroup:"external", contentModel:content[0], contentKey:content[1] }
      }
      this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    return (
      <div className="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-temperature" className="turf-nav-items">
          <button id="hstress" className="turf-nav-button" onClick={this.clickHandler.bind(this, "hstress")}>Heat Stress Index</button>
          <div className="turf-nav-link"><a href="http://www.nrcc.cornell.edu/industry/grass/html/frost.html" target="_blank" rel="noopener noreferrer">Frost Occurrence</a></div>
          <button id="tempdepart" className="turf-nav-button" onClick={this.clickHandler.bind(this, "temperature.departure")}>Temperature Departure</button>
          <button id="soiltemp" className="turf-nav-button" onClick={this.clickHandler.bind(this, "temperature.soil2in")}>Soil Temperature</button>
        </div>
      </div>
      );
    }
}


@inject("stores")
@observer
class TurfGDD50Menu extends React.Component {

  clickHandler(content_type) {
    let content = content_type.split('.')
    let content_keys = { component:"maps", contentGroup:"external", contentModel:content[0], contentKey:content[1] }
    this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    return (
      <div className="turf-active-menu">
        <div className="turf-active-menu-title">{this.props.title}</div>
        <div id="turf-temperature" className="turf-nav-items">
          <button id="gdd50last7" className="turf-nav-button" onClick={this.clickHandler.bind(this, "gdd50.last7days")}>Accumulation over last 7 days</button>
          <button id="gdd50fcast" className="turf-nav-button" onClick={this.clickHandler.bind(this, "gdd50.wgddfcst")}>Accumulation  days</button>
          <button id="gdd50difd" className="turf-nav-button" onClick={this.clickHandler.bind(this, "gdd50.sgdifd")}>Accumulation difference over last year (days)</button>
          <button id="gdd50difg" className="turf-nav-button" onClick={this.clickHandler.bind(this, "gdd50.sgdifg")}>Accumulation difference over last year (GDD)</button>
        </div>
      </div>
      );
    }
}


class TurfUsefulLinksMenu extends React.Component {
  render() {
    return (
      <div className="turf-active-menu">
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
      <div className="turf-active-menu">
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


@inject("stores")
@observer
class TurfNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'selectecMenu':'',};
  }

  divClickHandler(menu_type) {
    console.log("NAVIGATION.divClickHandler")
    console.log(" prev menu = " + this.state.selectedMenu)
    console.log(" next menu = " + menu_type)
    if (this.state.selectedMenu === menu_type) {
      this.setState({'selectedMenu': null,});
    } else {
      this.setState({'selectedMenu': menu_type,});
    }
  }
  
  homeClickHandler() {
      let content_keys = { component:"home" };
      this.props.stores.appstore.updateContentPane(content_keys);
  }

  render() {
    let selectedMenu = this.state.selectedMenu;
    console.log('NAVIGATION selectedMenu = ' + selectedMenu)
    console.log('NAVIGATION selected === disease : ' + (selectedMenu === "disease"))
    console.log('NAVIGATION selected !== disease : ' + (selectedMenu !== "disease"))

    return (
      <div className="turf-navigation">
        <div className="turf-nav-menus">
          <div className="turf-nav-home" onClick={this.homeClickHandler.bind(this)}>Turf Home Page</div>

          <div className="turf-nav-menu" onClick={this.divClickHandler.bind(this, "disease")}>
            { selectedMenu === "disease" && <DiseaseRiskMenu active={true} /> }
            { selectedMenu !== "disease" && <DiseaseRiskMenu active={false} /> }
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
