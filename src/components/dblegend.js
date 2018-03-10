import React from 'react';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
class DashboardLegend extends React.Component {

  render() {
    let legend = this.props.stores.models.model.dashboard.table;

    return (
      <div className="dashboard-element-legend">
        { legend.classes.map(function(value,i) {
          let class_str = 'legend-circle ' + value;
          let label = legend.labels[i];
          let key_str = 'legend' + i.toString();
          return <span key={key_str}><span className={class_str}></span>{label}</span>;
        }) }
      </div> 
    )
  }
}

export default DashboardLegend;
