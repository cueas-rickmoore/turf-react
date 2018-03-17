import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardDates from '../../components/dbdates.js';
import DashboardLegend from '../../components/dblegend.js';

@inject("stores")
@observer
class AverageDataComponent extends React.Component {

  render() {
    let fcast_idx = this.props.indexing.fcast;
    let indexes = this.props.indexing.indexes;
    let stores = this.props.stores;
    let data = stores.datastore.averageRisk;
    let risk = stores.models.model.dashboard.table.risk;

    return (
      <tr id="average-data" className="row_1">
        <th className="series-name data">7 Day Avg</th>
        <td className="series-data">
          { indexes.map(function(idx) {
            let key_str = 'avg' + idx.toString();
            let class_str = 'data ' + risk[data[idx]];
            if (idx < fcast_idx) { class_str = class_str + ' obs';
            } else { class_str = class_str + ' fcast'; }
            return <span key={key_str} className={class_str}>&nbsp;</span>;
          }) }
        </td>
      </tr>
    )
  }
}


@inject("stores")
@observer
class DailyDataComponent extends React.Component {

  render() {
    let fcast_idx = this.props.indexing.fcast;
    let indexes = this.props.indexing.indexes;

    let data = this.props.stores.datastore.dailyRisk;
    let risk = this.props.stores.models.model.dashboard.table.risk;

    return (
      <tr id="daily-data" className="row_1">
        <th className="series-name data">Daily</th>
        <td className="series-data">
          { indexes.map(function(idx) {
            let key_str = 'daily' + idx.toString();
            let class_str = 'data ' + risk[data[idx]];
            if (idx < fcast_idx) { class_str = class_str + ' obs';
            } else { class_str = class_str + ' fcast'; }
            return <span key={key_str} className={class_str}>&nbsp;</span>;
          }) }
        </td>
      </tr>
    )
  }
}


@inject("stores")
@observer
class ThreatDashboardTable extends React.Component {

  thumbIndexes = (date_indexes) => {
    let thumb_indexes = [ ];
    let idx = date_indexes.first;
    while (idx <= date_indexes.last) { thumb_indexes.push(idx); idx++; }
    return thumb_indexes;
  }

  render () {
    let datastore = this.props.stores.datastore;
    let date_indexes = this.props.stores.datestore.dboardDateIndexes;
    let thumb_indexes = this.thumbIndexes(date_indexes);
    let indexing = {
      fcast: date_indexes.fcast,
      first: this.props.stores.datestore.firstValidDate,
      indexes: thumb_indexes,
    }

    return (
      <div className="turf-dashboard-element">
        <div className="dashboard-element-header">
          <DashboardLegend />
        </div>
        <table className="turf-dashboard-table" cellPadding="0" cellSpacing="0">
        <tbody>
          { datastore.dailyRisk && <DailyDataComponent indexing={indexing} /> }
          { datastore.averageRisk && <AverageDataComponent indexing={indexing} /> }
          <DashboardDates />
        </tbody>
        </table>
      </div>
    )
  }
}

export default ThreatDashboardTable;
