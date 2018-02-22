import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

@inject("stores")
@observer
class DashboardColumnChart extends Component {

  genChartConfig(data_model, model_data, model_dates, season) {
    let start_date = season.startDate;
    if (model_dates.firstValid && (model_dates.firstValid > start_date)) {
        start_date = model_dates.firstValid;
    }

    const dbchart = data_model.dashboard.chart;

    const zones = dbchart.zones.map(function(zone,index) {
        return { value:zone, className:'zone-'+(index+1).toString() }
    });

    return {
      chart: { alignTicks:false, height:225, renderTo:'#dashboard-chart-continaer' },
      legend: { enabled:false },
      navigator:{ enabled:true, height:40, margin:5, handles:{ borderColor:'#0000ff' }, series: { type:'column' }, yAxis:{ min:0.5, max:3 } },
      plotOptions: { series: { pointStart: start_date, pointInterval: 24*3600*1000, }, },
      rangeSelector: { selected:0, buttonSpacing:6,
        buttons: [
          { type:'day', count:10, text:'10 days' },
          { type:'day', count:30, text:'30 days' },
          { type:'all', text:'Season' }
        ],
        buttonTheme: { height:20, width:54, fill:'#cccccc',
          style: { color:'%0000dd' },
          states: { select: { fill:'#0000dd', style:{ color:'#ffffff' } }, }
        },
      },
      scrollbar:{ height:2 },
      series: [
        { colorByPoint: true,
          colors: dbchart.colors,
          data: model_data,
          name: dbchart.seriesName,
          showInNavigator: true,
          type: 'column',
          zoneAxis: 'y',
          zones: zones, 
        },
      ],
      title: null,
      tooltip: { enabled:false },
      type: 'column',
      xAxis: {
        type: 'datetime',
        tickInterval:518400000, dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' } },
      yAxis: { title:null, max:3, min:0, labels:{ enabled:false }, tickInterval: 1 },
      zoneAxis: 'y',
      zones: zones, 
    }
  }

  render() {
    /* access the observables in the model and data stores */
    const data_model = this.props.stores.models.model(this.props.stores.datastore.modelName);
    const risk_data = this.props.stores.datastore.dailyRisk
    const model_dates = this.props.stores.datastore.modelDates;
    const season = this.props.stores.datastore.seasonDates;

    let chartConfig = this.genChartConfig(data_model, risk_data.map(x => x + 1.0), model_dates, season);

    return (
      <div id="dashboard-chart-container">
        <ReactHighstock config={chartConfig} />
      </div>
    );
  }
}

export default DashboardColumnChart;
