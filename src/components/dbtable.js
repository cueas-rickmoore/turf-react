import React from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

@inject("store")
@observer
class AverageDataComponent extends React.Component {

  render() {
    let model = this.props.store.model;
    let data = model.averageRisk;
    let date_indexes = model.dboardDateIndexes
    let fcast_idx = date_indexes.fcast;
    let risk = model.dataModel.dbtable.risk;

    return (
      <tr id="average-data" className="row_1">
        <th className="series-name data">7 Day Avg</th>
        <td className="series-data">
          { this.props.indexes.map(function(idx) {
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


@inject("store")
@observer
class DailyDataComponent extends React.Component {

  render() {
    let model = this.props.store.model;
    let data = model.dailyRisk;
    let date_indexes = model.dboardDateIndexes
    let fcast_idx = date_indexes.fcast;
    let risk = model.dataModel.dbtable.risk;

    return (
      <tr id="daily-data" className="row_1">
        <th className="series-name data">Daily</th>
        <td className="series-data">
          { this.props.indexes.map(function(idx) {
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


@inject("store")
@observer
class DailyDateComponent extends React.Component {

  render() {
    const model = this.props.store.model;
    const date_indexes = model.dboardDateIndexes
    const model_dates = model.modelDates;

    let indexes = this.props.indexes;
    let fcast_idx = date_indexes.fcast;
    let first_valid = model_dates.firstValid;

    return (
      <tr id="dashboard-dates" className="dates">
        <th className="series-name dates">Dates</th>
        <td className="series-dates">
          { indexes.map(function(idx) {
            let key_str = 'date' + idx.toString();
            let the_date = moment(first_valid).add(idx,'d').format('MM-DD');
            if (idx < fcast_idx) {
              return <span key={key_str} className={'date obs'}>{the_date}</span>;
            } else { 
              return <span key={key_str} className={'date fcast'}>{the_date}</span>;
            }
          }) }
        </td>
      </tr>
    )
  }
}


@inject("store")
@observer
class DashboardLegend extends React.Component {
  render() {
    let model = this.props.store.model.dataModel
    let legend = model.dbtable;
    return (
      <div className="dashboard-element-legend">
        { legend.risk.map(function(value,i) {
          let class_str = 'legend-circle ' + value;
          let label = legend.labels[i];
          let key_str = 'legend' + i.toString();
          return <span><span key={key_str} className={class_str}></span>{label}</span>;
        }) }
      </div> 
    )
  }
}


@inject("store")
@observer
class DashboardTable extends React.Component {

  genDataIndexes(first, last) {
    let indexes = [ ];
    let idx = first;
    while (idx <= last) { indexes.push(idx); idx++; }
    return indexes;
  }

  render () {
    const model = this.props.store.model;
    const date_indexes = model.dboardDateIndexes;
    const indexes = this.genDataIndexes(date_indexes.first, date_indexes.last);

    return (
      <div className="turf-dashboard-element">
        <div className="dashboard-element-header">
          <DashboardLegend />
        </div>
        <table className="turf-dashboard-table" cellPadding="0" cellSpacing="0">
        <tbody>
          <DailyDataComponent indexes={indexes} />
          <AverageDataComponent indexes={indexes} />
          <DailyDateComponent indexes={indexes} />
        </tbody>
        </table>
      </div>
    )
  }
}

export default DashboardTable;
