import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

@inject("stores")
@observer
class ControlColumnChart extends Component {

  genChartConfig(data_model, model_data, datestore) {
    console.log('ControlColumnChart.genChartConfig model : ' + data_model.fullname);

    let start_date = datestore.firstValidDate;
    let chart_props = data_model.dashboard.chart;

    let num_zones = chart_props.zones.length;
    let zones = chart_props.zones.map(function(zone,index) {
        return { value:zone, className:'zone-'+(index+1).toString() }
    });

    return {
      isPureConfig: false,
      neverReflow: false,
      chart: { alignTicks:false, height:225, renderTo:'#dashboard-chart-container' },
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
          colors: chart_props.colors,
          data: model_data,
          name: chart_props.seriesName,
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
      yAxis: { title:null, max:num_zones, min:0, labels:{ enabled:false }, tickInterval: 1 },
      zoneAxis: 'y',
      zones: zones, 
    }
  }

  render() {
    /* access the observables in the model and data stores */
    let data_model = this.props.stores.models.model;
    let chart_data = this.props.stores.datastore.data[this.props.treatment];
    console.log('ControlColumnChart num data points = ' + chart_data.length + ' max = ' + Math.max(...chart_data))
    console.log(chart_data)
    let datestore = this.props.stores.datestore;

    let chartConfig = this.genChartConfig(data_model, chart_data.map(x => x + 1.0), datestore);
    console.log('\n\nCHART COLORS : ' + chartConfig.series[0].colors + '\n\n')

    return (
      <div id="dashboard-chart-container">
        <ReactHighstock config={chartConfig} />
      </div>
    );
  }
}

export default ControlColumnChart;
