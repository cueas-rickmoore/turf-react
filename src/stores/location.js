import { observable, computed, action } from 'mobx';


export default class TurfLocationStore {

    @observable address = 'Robert Trent Jones Golf Course, Cornell University'
    @observable lat = 42.458;
    @observable lon = -76.458;
    @observable node = '76458-42458';
    @action updateLocation = (changeEvent) => {
        let loc_obj = changeEvent.target.value;
        let node_str = this.gridNodeString(loc_obj.lat, loc_obj.lon);
        if (this.node !== node_str) {
            this.address = loc_obj.address;
            if (loc_obj.lat !== this.lat) { this.lat = loc_obj.lat }
            if (loc_obj.lon !== this.lon) { this.lon = loc_obj.lon }
            this.node = node_str;
        }
    }

    adjustPrecision = (value, precision) => {
        var mapping = [ [0.02084,'000'], [0.06249,'042'], [0.10416,'083'], [0.14584,'125'],
                        [0.18759,'167'], [0.22916,'208'], [0.27084,'250'], [0.31249,'292'],
                        [0.35416,'333'], [0.39584,'375'], [0.43649,'417'], [0.47916,'583'],
                        [0.52084,'500'], [0.56249,'542'], [0.60416,'583'], [0.64584,'625'],
                        [0.68749,'667'], [0.72916,'708'], [0.77084,'750'], [0.81249,'792'],
                        [0.85416,'833'], [0.89584,'875'], [0.93749,'917'], [0.97916,'958']
                      ];
        var valstr;
        if (value < 0.0) { valstr = value.toString().slice(1); } else { valstr = value.toString(); }
        var dot_indx = valstr.indexOf('.');
        var left = valstr.substring(0,dot_indx);
        var right = parseFloat(valstr.substring(dot_indx));
        var i, pair;

        for (i=0; i < mapping.length; i++) {
            pair = mapping[i];
            if (right < pair[0]) { return left + pair[1]; } 
        }
        return left + '000';
    }

    gridNodeString = (lat, lon) => {
       let lat_str = this.adjustPrecision(lat, 3);
       let lon_str = this.adjustPrecision(lon, 3).slice(1)
       return lon_str + '-' + lat_str;
    }
}

