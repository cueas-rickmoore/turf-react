import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class DashboardLegend extends React.Component {

  render() {
    let table = this.props.store.model.dbtable;

    return (
      <div className="dashboard-element-legend">
        { table.classes.map(function(class_name,i) {
          let class_str = 'legend-circle ' + class_name;
          let label = 'date ' + table.labels[i];
          let key_str = 'legend-' + class_name;
          return <span key={key_str} className={class_str}>{label}</span>;
        }) }
      </div> 
    )
  }
}

export default DashboardTitle;
