import React from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

@inject("stores")
@observer
class DashboardDates extends React.Component {

  dateIndexes = (date_indexes) => {
    let thumb_indexes = [ ];
    let idx = date_indexes.first;
    while (idx <= date_indexes.last) { thumb_indexes.push(idx); idx++; }
    return thumb_indexes;
  }

  render() {
    let first_valid = this.props.stores.datestore.firstValidDate;
    let date_indexes = this.props.stores.datestore.dboardDateIndexes;
    let indexes = this.dateIndexes(date_indexes);
    let fcast_idx = date_indexes.fcast;

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

export default DashboardDates;
