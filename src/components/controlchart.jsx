import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Highcharts from 'highcharts/highstock';
import { HighchartsStockChart, Chart, ColumnSeries, Navigator,
         RangeSelector, Title, XAxis, YAxis, withHighcharts
       } from 'react-jsx-highstock';

@inject("stores")
@observer
class ControlColumnChart extends Component {

  render() {
    console.log('ControlColumnChart.render "' + this.props.treatment + '"')
    let model = this.props.stores.models.model;
    let dbchart = model.dashboard.chart;
    /* values for various plot component options */ 
    let date_label_formats = {day:'%d %b',week:'%d %b',month:'%b<br/>%Y',year:'%Y'};
    let fullname = model.treatments[this.props.treatment].fullname
    let num_zones = dbchart.zones.length;
    let plot_options = {
        series:{ pointStart:this.props.stores.datestore.firstValidDate, pointInterval:24*3600*1000 }
    }
    let range_button_theme = {
        height:20, width:54,
        style:{fill:'#000000', color:'#ff0000'},
        states:{select:{fill:'#0000dd', style:{color:'#ffffff'}}}
    }
    let zones = dbchart.zones.map(function(zone,index) {
        return { value:zone, className:'zone-'+(index+1).toString() }
    });
    /* finagle data to be compatible with a column chart */
    let chart_data = this.props.stores.datastore.data[this.props.treatment].map(x => x + 1.0);
    
    console.log('ControlColumnChart num data points = ' + chart_data.length + ' max = ' + Math.max(...chart_data))

    return (
      <div id="dashboard-chart-container">
        <HighchartsStockChart plotOptions={plot_options}>
          <Chart alignTicks={false} height={225} type="column" />
          <Title>{fullname + " Treatment Recomendations"}</Title>

          <XAxis type="datetime" tickInterval={518400000} dateTimeLabelFormats={date_label_formats} />

          <YAxis max={num_zones} min={0} labels={{enabled:false}} tickInterval={1}>
            <ColumnSeries id={this.props.treatment} colorByPoint={true} colors={dbchart.colors}
                          data={chart_data} name={fullname} title={null} zones={zones} />
          </YAxis>

          <Navigator height={40} margin={5} handles={{borderColor:'#0000ff'}}
                     scrollbar={{height:2}} yAxis={{min:0.5,max:3}}>
            <Navigator.Series seriesId={this.props.treatment} />
          </Navigator>

          <RangeSelector buttonSpacing={6} buttonTheme={range_button_theme} selected={0}>
            <RangeSelector.Button count={10} type="day">10 days</RangeSelector.Button>
            <RangeSelector.Button count={30} type="day">30 days</RangeSelector.Button>
            <RangeSelector.Button type="all">Season</RangeSelector.Button>
          </RangeSelector>
        </HighchartsStockChart>
      </div>
    );
  }

}

export default withHighcharts(ControlColumnChart, Highcharts);
