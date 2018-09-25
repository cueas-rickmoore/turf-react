import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import scriptLoader from 'react-async-script-loader';

import jQuery from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/button.css';
import 'jquery-ui/themes/base/dialog.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/button';
import 'jquery-ui/ui/widgets/dialog';
import '../styles/location-dialog.css';
window.jQuery = jQuery;

@scriptLoader( ['/app_data/common/js/location-dialog.js',])
@inject("stores")
@observer
class LocationMapDialog extends Component {
  locations;
  ready;

  constructor(props) {
    super(props);
    this.locations = this.props.stores.locations;
    this.ready = false;
  }

  // Initialize the map dialog
  initMapDialog = (jQuery) => {
    console.log('\n\LocationMapDialog initializing jQuery map dialog');
    console.log('jQuery : ' + typeof jQuery);
    let options = { width:600, height:500, google:window.google, 
                    default:this.selected };
    console.log('jQuery(".location-map-dialog").NRCCLocationMapDialog : ' + typeof jQuery(".location-map-dialog").NRCCLocationMapDialog)
    console.log('\n\n');
    jQuery(".location-map-dialog").NRCCLocationMapDialog(options);
    let map_dialog = jQuery(".location-map-dialog").NRCCLocationMapDialog();
    map_dialog("bind", "close", (ev, context) => {
      this.locations.update(context);
    });
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    console.log('\n\nLocationMapDialog.componentWillReceiveProps')
    console.log('      isScriptLoaded argument : ' + isScriptLoaded)
    console.log('    this.props.isScriptLoaded : ' + this.props.isScriptLoaded)
    console.log(' isScriptLoadSucceed argument : ' + isScriptLoadSucceed)
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) { this.ready = true; }
    }
  }

  render() {
    if (this.ready) { 
        console.log('calling : this.locations.initMapDialog')
        this.initMapDialog(jQuery);
        console.log('returned : this.locations.initMapDialog\n\n')
    }
    return <div className="location-map-dialog">&nbsp;</div>
  }
}

export default LocationMapDialog;
