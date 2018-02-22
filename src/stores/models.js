export default class TurfDataModels {
  defaults;
  models;
  constructor() {

    this.defaults = {
      dbchart: { colors: ['#00aa00','#ffd700','#ff0000'],
                 zones: [1.1,2.1,3.1],
      },
      dbtable: { columns: 10,
                 labels: ['No Risk','Moderate','High'],
                 risk: ['no_risk','moderate','high'],
      },
      dbthumbs: { count: 7, start: 'doi',},
    }

    this.models = {
      anthrac: {
        dashboard: {
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Anthracnose Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs, { altString:"SLASHED Anthracnose Risk Map", }),
        },
        description: "Anthracnose Risk Estimates",
        full_name: "Anthracnose",
        name: 'anthrac',
        urls: {
          data: '/data/YEAR/json/Anthracnose/YEAR-GRIDNODE-Anthracnose-Risk.json',
          maps: '/data/YEAR/maps/Anthracnose/DATESTR-Anthracnose-Risk-Map.png',
          thumbs: '/data/YEAR/thumbs/Anthracnose/DATESTR-Anthracnose-Risk-Thumbnail.png',
        },
      },
      bpatch: { 
        dashboard: {
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Brown Patch Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs, { altString:"SLASHED Brown Patch Risk Map", }),
        },
        description: "Brown Patch Risk Estimates",
        full_name: "Brown Patch",
        name: 'bpatch',
        urls: {
          data: '/data/YEAR/json/Brown-Patch/YEAR-GRIDNODE-Brown-Patch-Risk.json',
          maps: '/data/YEAR/maps/Brown-Patch/DATESTR-Brown-Patch-Risk-Map.png',
          thumbs: '/data/YEAR/thumbs/Brown-Patch/DATESTR-Brown-Patch-Risk-Thumbnail.png',
        },
      },
      dandelion: { 
        full_name: 'Dandelion',
        gdd_threshold:50,
        name: 'dandelion',
        treatments: {
            amine: {
                name:'Amine',
                stages:['early','marginal','favorable'],
                stage_thresholds:[0,150,180],
            },
            ester: {
                name:'Ester',
                stages:['early','marginal','favorable'],
                stage_thresholds:[0,130,145],
            },
        },
        urls: {
          data:'/data/YEAR/json/Dollarspot/YEAR-GRIDNODE-Dandelion.json',
          maps:'/data/YEAR/maps/Dandelion/DATESTR-Dandelion-TREATMENT-Map.png',
          thumbs:'/data/YEAR/thumbs/Dandelion/DATESTR-Dandelion-TREATMENT-Thumbnail.png',
        },
      },
      dspot: { 
        dashboard: {
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Dollarspot Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs, { altString:"SLASHED Dollarspot Risk Map", }),
        },
        description: "Dollarspot Risk Estimates",
        full_name: "Dollarspot",
        name: 'dspot',
        urls: {
          data:'/data/YEAR/json/Dollarspot/YEAR-GRIDNODE-Dollarspot-Risk.json',
          maps:'/data/YEAR/maps/Dollarspot/DATESTR-Dollarspot-Risk-Map.png',
          thumbs:'/data/YEAR/thumbs/Dollarspot/DATESTR-Dollarspot-Risk-Thumbnail.png',
        },
      },
      hstress: { 
        dashboard: {
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Heat Stress Index', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs, { altString:"SLASHED Heat Stress Index Map", }),
        },
        description: "Heat Stress Index Estimates",
        full_name: "Heat Stress",
        name: 'hstress',
        urls: {
          data:'/data/YEAR/json/Heat-Stress/YEAR-GRIDNODE-Heat-Stress-Risk.json',
          maps:'/data/YEAR/maps/Heat-Stress/DATESTR-Heat-Stress-Risk-Map.png',
          thumbs:'/data/YEAR/thumbs/Heat-Stress/DATESTR-Heat-Stress-Risk-Thumbnail.png',
        },
      },
      pblight: { 
        dashboard: {
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Pythium Blight Risk', }),
          table: this.defaults.dbtable,
          thumbs: Object.assign({}, this.defaults.dbthumbs, { altString: "SLASHED Pythium Blight Risk Map", }),
        },
        description: "Pythium Blight Risk Estimates",
        full_name: "Pythium Blight",
        name: 'pblight',
        urls: {
          data:'/data/YEAR/json/Pythium-Blight/YEAR-GRIDNODE-Pythium-Blight-Risk.json',
          maps:'/data/YEAR/maps/Pythium-Blight/DATESTR-Pythium-Blight-Risk-Map.png',
          thumbs:'/data/YEAR/thumbs/Pythium-Blight/DATESTR-Pythium-Blight-Risk-Thumbnail.png',
        },
      },
      seedhead: {
        full_name: 'Seedhead',
        gdd_threshold:32,
        name: 'seedhead',
        treatments: {
            embark: {
                name:'Embark',
                stages:['early','ideal','marginal','late'],
                stage_thresholds:[0,350,450,650],
            },
            proxy: {
                name:'Proxy',
                stages:['early','ideal','marginal','late'],
                stage_thresholds:[0,200,300,500],
            },
        },
        urls: {
          data: '/data/YEAR/json/Dollarspot/YEAR-GRIDNODE-Seedhead.json',
          maps: '/data/YEAR/maps/Seedhead/DATESTR-Seedhead-TREATMENT-Map.png',
          thumbs: '/data/YEAR/thumbs/Seedhead/DATESTR-Seedhead-TREATMENT-Thumbnail.png',
        },
      },
    }
  }

  model = (name) => { return this.models[name] }

}

