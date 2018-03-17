import { observable, computed, action } from 'mobx';

export default class TurfExternalMapStore {

  constructor() {
    this.groups = {

      gdd32:{
        forecast:{
          description:'Forecast base 32°F GDD accumulation',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wgdd32fcst.png',
        },
        last7days:{
          description:'7 Day average base 32°F GDD accumulation',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/sgdd32.png',
        },
      },

      gdd50:{
        diffdays:{
          description:'Difference in base 50°F GDD accumulation over last year',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/sgdifd.png',
        },
        diffgdd:{
          description:'Difference in base 50°F GGD accumulation over last year',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/sgdifg.png',
        },
        forecast:{
          description:'Base 50°F GDD accumulation forecast',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wgddfcst.png',
        },
        last7days:{
          description:'7 Day average base 50°F GDD accumulation',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wgdd.png',
        },
        normdiffdays:{
          description:'Base 50°F GDD accumulation difference from "normal"',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/sgdptd.png',
        },
        normdiffgdd:{
          description:'Base 50°F GGD accumulation difference from "normal"',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/sgdptg.png',
        },
        season:{
          description:'Base 50°F GDD accumulation since March 15',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/sgdd.png',
        },
      },

      irrigate:{
        evapot:{
          description:'Total potential evapotranspiration (inches) over last 7 days.',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wpet.png',
        },
        moisdef:{
          description:'Moisture deficit over last 7 days',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wdfct.png',
        },
        moisdefcst:{
          description:'Forecast moisture deficit over next 3 days',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/dfct_fcst.png',
        },
        rainfall:{
          description:'Total rainfall over the last 7 days',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wptot.png',
        },
        soilmoist:{
          description:'USDA Topsil Moisture (% State Area)',
          map_url:'http://www.cpc.ncep.noaa.gov/products/monitoring_and_data/soilmmap.gif',
        },
        soilcomp5:{
          description:'USDA Topsil Moisture - Current vs. 5-year Mean',
          map_url:'http://www.cpc.ncep.noaa.gov/products/monitoring_and_data/5yrcomp.gif',
        },
        soilcomp10:{
          description:'USDA Topsil Moisture - Current vs. 10-year Mean',
          map_url:'http://www.cpc.ncep.noaa.gov/products/monitoring_and_data/10yrcomp.gif',
        },
      },

      temperature:{
        departure:{
          description:'Temperature departure (°F)',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/wtdpt.png',
        },
        soil2in:{
          description:'Temperature (°F) of the soil 2" below the surface',
          map_url:'http://www.nrcc.cornell.edu/dyn_images/grass/soilTemp.png',
        },
      },

    }

    this.group_keys = Object.getOwnPropertyNames(this.groups);

  }

  mapSpec = (group_key, map_key) => { return this.groups[group_key][map_key]; }

}

