import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardDates from '../../components/dbdates.js';
import DashboardLegend from '../../components/dblegend.js';

@inject("stores")
@observer
class DataComponent extends React.Component {

  render() {
    let model = this.props.model;
    let classes = model.dashboard.table.classes;
    let name = this.props.treatment;
    let fullname = model.treatments[this.props.treatment].fullname;
    
    let fcast_idx = this.props.indexing.fcast;
    let indexes = this.props.indexing.indexes;
    let data = this.props.data[name];

    return (
      <tr id={model.name+'-'+name} className="row_1">
        <th className="series-name data">{fullname}</th>
        <td className="series-data">
          { indexes.map(function(idx) {
            let key_str = name + idx.toString();
            let class_str = 'data ' + classes[data[idx]];
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
class ControlsDashboardTable extends React.Component {

  dateIndexes = () => {
    let date_indexes = this.props.stores.datestore.dboardDateIndexes;
    let indexes = [ ];
    let idx = date_indexes.first;
    while (idx <= date_indexes.last) { indexes.push(idx); idx++; }
    return { first: date_indexes.first, last: date_indexes.last,
             fcast: date_indexes.fcast, indexes:indexes }
  }

  render () {
    let data = this.props.stores.datastore.data;
    let model = this.props.stores.models.model;
    let indexing = this.dateIndexes()

    return (
      <div className="turf-dashboard-element">
        <div className="dashboard-element-header">
          <DashboardLegend />
        </div>
        <table className="turf-dashboard-table" cellPadding="0" cellSpacing="0">
        <tbody>
          { model.sequence.map( function(treatment,t) {
            let key_str = 'dbtable-row-' + t;
            return <DataComponent key={key_str} data={data} indexing={indexing} model={model} treatment={treatment}/>
            }
          ) }
          <DashboardDates />
        </tbody>
        </table>
      </div>
    )
  }
}

export default ControlsDashboardTable;
