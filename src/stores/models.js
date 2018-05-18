import { observable, computed, action } from 'mobx';

export default class TurfDataModels {
  constructor() {

    this.defaults = {
      dbchart: {
        colors: ['#00aa00','#ffd700','#ff0000'],
        zones: [1.1,2.1,3.1],
      },
      dbtable: {
        columns: 10,
        classes: ['no_risk','moderate','high'],
        labels: ['No Risk','Moderate','High'],
        risk: ['no_risk','moderate','high'],
      },
      dbthumbs: { count: 7, start: 'doi',},
    }

    this.model_name = null;

    this.models = {
      anthrac: {
        dashboard: {
          altString: "Anthracnose Risk Map for ALTDATE",
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Anthracnose Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Anthracnose Risk Estimates",
        fullname: "Anthracnose",
        group: "threats",
        name: 'anthrac',
        urls: {
          data: 'json/Anthracnose/YEAR-GRIDNODE-Anthracnose-Risk.json',
          maps: 'maps/Anthracnose/DATESTR-Anthracnose-Risk-Map.png',
          thumbs: 'thumbs/Anthracnose/DATESTR-Anthracnose-Risk-Thumbnail.png',
        },
      },
      bpatch: { 
        dashboard: {
          altString: "Brown Patch Risk Map for ALTDATE",
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Brown Patch Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Brown Patch Risk Estimates",
        fullname: "Brown Patch",
        group: "threats",
        image_alt: {
          maps: 'Brown Patch disease risk map for DATESTR',
          thumbs: 'Brown Patch disease risk thmbnail for DATESTR',
        },
        name: 'bpatch',
        urls: {
          data: 'json/Brown-Patch/YEAR-GRIDNODE-Brown-Patch-Risk.json',
          maps: 'maps/Brown-Patch/DATESTR-Brown-Patch-Risk-Map.png',
          thumbs: 'thumbs/Brown-Patch/DATESTR-Brown-Patch-Risk-Thumbnail.png',
        },
      },
      dandelion: {
        dashboard: {
          altString: 'Dandelion TREATMENT control map for ALTDATE',
          chart: {
            colors: ['#ff0000','#ffd700','#00aa00'],
            seriesName:'Dandelion Treatments',
            zones: [1.1,2.1,3.1],
          },
          table: {
            columns: 10,
            classes:['early','marginal','favorable'],
            labels:['Early','Marginal','Favorable'],
          },
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Dandelion Control Recommendations",
        fullname: 'Dandelion',
        gdd_threshold:50,
        group: "controls",
        name: 'dandelion',
        sequence: ['amine','ester'],
        treatments: {
          amine: {
            fullname:'Amine',
            stage_thresholds:[0,150,180],
          },
          ester: {
            fullname:'Ester',
            stage_thresholds:[0,130,145],
          },
        },
        urls: {
          data:'json/Dandelion/YEAR-GRIDNODE-Dandelion.json',
          maps:'maps/Dandelion/TREATMENT/DATESTR-TREATMENT-Dandelion-Control-Map.png',
          thumbs:'thumbs/Dandelion/TREATMENT/DATESTR-TREATMENT-Dandelion-Control-Thumbnail.png',
        },
      },
      dspot: { 
        dashboard: {
          altString: 'Dollarspot disease risk map for ALTDATE',
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Dollarspot Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Dollarspot Risk Estimates",
        fullname: "Dollarspot",
        group: "threats",
        name: 'dspot',
        urls: {
          data:'json/Dollarspot/YEAR-GRIDNODE-Dollarspot-Risk.json',
          maps:'maps/Dollarspot/DATESTR-Dollarspot-Risk-Map.png',
          thumbs:'thumbs/Dollarspot/DATESTR-Dollarspot-Risk-Thumbnail.png',
        },
      },
      hstress: { 
        dashboard: {
          altString: 'Heat Stress index map for ALTDATE',
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Heat Stress Index', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Heat Stress Index Estimates",
        fullname: "Heat Stress",
        group: "threats",
        name: 'hstress',
        urls: {
          data:'json/Heat-Stress/YEAR-GRIDNODE-Heat-Stress-Risk.json',
          maps:'maps/Heat-Stress/DATESTR-Heat-Stress-Risk-Map.png',
          thumbs:'thumbs/Heat-Stress/DATESTR-Heat-Stress-Risk-Thumbnail.png',
        },
      },
      pblight: { 
        dashboard: {
          altString: 'Pythium Blight disease risk map for ALTDATE',
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Pythium Blight Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Pythium Blight Risk Estimates",
        fullname: "Pythium Blight",
        group: "threats",
        name: 'pblight',
        urls: {
          data:'json/Pythium-Blight/YEAR-GRIDNODE-Pythium-Blight-Risk.json',
          maps:'maps/Pythium-Blight/DATESTR-Pythium-Blight-Risk-Map.png',
          thumbs:'thumbs/Pythium-Blight/DATESTR-Pythium-Blight-Risk-Thumbnail.png',
        },
      },
      seedhead: {
        dashboard: {
          altString: 'Seadhead TREATMENT control map for ALTDATE',
          chart: {
            colors: ['#ff0000','#00aa00','#ffd700','#ccd1d1'],
            seriesName:'Seedhead Control Recommendations',
            zones: [1.1,2.1,3.1,4.1],
          },
          table: {
            columns: 10,
            classes:['early','ideal','marginal','late'],
            labels:['Too Early','Ideal','Marginal','Too Late'],
          },
          thumbs: Object.assign({}, this.defaults.dbthumbs),
        },
        description: "Seedhead Control Recommendations",
        fullname: 'Seedhead',
        gdd_threshold:32,
        group: "controls",
        name: 'seedhead',
        sequence: ['embark','proxy'],
        treatments: {
            embark: {
                fullname:'Embark',
                stage_thresholds:[0,350,450,650],
            },
            proxy: {
                fullname:'Proxy',
                stage_thresholds:[0,200,300,500],
            },
        },
        urls: {
          data: 'json/Seedhead/YEAR-GRIDNODE-Seedhead.json',
          maps: 'maps/Seedhead/TREATMENT/DATESTR-TREATMENT-Seedhead-Control-Map.png',
          thumbs: 'thumbs/Seedhead/TREATMENT/DATESTR-TREATMENT-Seedhead-Control-Thumbnail.png',
        },
      },
    }

    this.model_keys = Object.getOwnPropertyNames(this.models);
    console.log('VALID MODEL KEYS : ' + this.model_keys)
  }

  @observable active_model = null;
  @observable model_name = null;
  @action changeDataModel = (model_name) => {
     if (model_name !== this.model_name) {
         this.model_name = model_name;
         this.active_model = this.models[this.model_name];
        }
    }
  @computed get modelName() { return this.model_name }
  @computed get model() { return this.active_model }

  isValidModel = (model_name) => {
      return this.model_keys.includes(model_name)
  }
  modelFromName = (model_name) => { return this.models[model_name] }

  urlTemplate = (model_name, url_type) => {
    return this.models[model_name].urls[url_type]
  }

}

