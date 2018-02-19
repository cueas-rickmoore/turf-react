import React from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

@inject("stores")
@observer
class AverageDataComponent extends React.Component {

  render() {
    let data = this.props.stores.modeldata.averageRisk;
    let fcast_idx = this.props.indexing.fcast;
    let indexes = this.props.indexing.indexes;
    let model = this.props.stores.models.model(this.props.stores.modeldata.model_name);
    let risk = model.dashboard.table.risk;

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
    let data = this.props.stores.modeldata.dailyRisk;
    let fcast_idx = this.props.indexing.fcast;
    let indexes = this.props.indexing.indexes;
    let model = this.props.stores.models.model(this.props.stores.modeldata.model_name);
    let risk = model.dashboard.table.risk;

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
class DailyDateComponent extends React.Component {

  render() {
    let fcast_idx = this.props.indexing.fcast;
    let first_valid = this.props.indexing.first_valid;
    let indexes = this.props.indexing.indexes;
    let model = this.props.stores.models.model(this.props.stores.modeldata.model_name);
    let risk = model.dashboard.table.risk;

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


@inject("stores")
@observer
class DashboardLegend extends React.Component {
  render() {
    let model = this.props.stores.models.model(this.props.stores.modeldata.model_name);
    let legend = model.dashboard.table;
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


@inject("stores")
@observer
class DashboardTable extends React.Component {

  dateIndexing = (data_model, model_dates, season_dates) => {
    let first_idx = 0;
    let fcast_idx = 999;
    let last_idx = model_dates.lastValid.diff(season_dates.seasonStart,'d');
    let first_valid = (model_dates.firstValid ? model_dates.firstValid : season_dates.startDate);

    if (model_dates.doi) {
      let doi = model_dates.doi.diff(first_valid,'d');
      first_idx = doi - 3;
      fcast_idx = doi + 1;
      last_idx = first_idx + data_model.dashboard.table.columns - 1;
    } else {
      if (model_dates.fcastStart && model_dates.fcastStart <= model_dates.lastValid) {
        fcast_idx = model_dates.fcastStart.diff(first_valid,'d');
        if (model_dates.fcastEnd <= model_dates.lastValid) {
            last_idx = model_dates.fcastEnd.diff(first_valid,'d');
        }
      }
      first_idx = last_idx - data_model.dashboard.table.columns + 1;
    }

    let indexes = [ ];
    let idx = first_idx;
    while (idx <= last_idx) { indexes.push(idx); idx++; }
    return { first_valid:first_valid, fcast:fcast_idx, indexes:indexes }
  }

  render () {
    const data_store = this.props.stores.modeldata;
    const date_store = this.props.stores.modeldata;
    const model_store = this.props.stores.models;
    let model = model_store.model(data_store.model_name);
    let indexing = this.dateIndexing(model, date_store.modelDates, date_store.seasonDates);

    return (
      <div className="turf-dashboard-element">
        <div className="dashboard-element-header">
          <DashboardLegend />
        </div>
        <table className="turf-dashboard-table" cellPadding="0" cellSpacing="0">
        <tbody>
          <DailyDataComponent indexing={indexing} />
          <AverageDataComponent indexing={indexing} />
          <DailyDateComponent indexing={indexing} />
        </tbody>
        </table>
      </div>
    )
  }
}

export default DashboardTable;
