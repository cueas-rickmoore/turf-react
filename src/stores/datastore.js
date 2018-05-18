import { observable, computed, action } from 'mobx';

export default class TurfDataStore {
    stores;
    constructor(appstores) {
      this.stores = appstores;
    }
    model_name = null;

    @observable data = {
      /* average:[0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,0,1,0,0,1,2,0,0,0,0,0,0,2,2,1,0,0,0,0,1,0,0,0,0,2,2,2,2,1,1,1,1,2,2,1,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         daily:[0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,0,1,0,0,1,2,0,0,0,0,0,0,2,2,1,0,0,0,0,1,0,0,0,1,2,1,1,0,0,1,1,1,2,2,1,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      */
    }
    @computed get averageRisk() { return this.data.average }
    @computed get dailyRisk() { return this.data.daily }

    @action updateModelData = (json) => {
      this.model_name = json.name;
      Object.entries(json.data).forEach(([key, value]) => {
          console.log('   "' + key + '" with data for ' + value.length + ' days');
      });
      this.data = json.data;
    }

    obliviate = () => { this.data = null }

}

