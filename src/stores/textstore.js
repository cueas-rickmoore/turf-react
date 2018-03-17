
export default class TurfTextStore {
  app;
  constructor(app) {
    this.app = app;

    this.descriptions = {

      anthrac:['<h3>About Anthracnose Disease Risk</h3>',
               '<p>The Anthracnose risk index is based on the model of Danneberger',
               'et al. (1984) with slight modifications for compatibility with NWS',
               'gridded weather data. The model uses combination of hourly leaf',
               'wetness and temperature are used to estimate the risk of an outbreak.</p>',
               '<p>On a daily basis,',
               '<span class="high">High risk</span> indicates ...', 
               '<span class="moderate">Moderate risk</span> indicates ...',
               '<span class="no_risk">Low risk</span> indicates .... ',
               '</p>',
               '<p>On a weekly basis',
               '<span class="high">High risk</span> indicates consistent (typically',
               'more than 4 days) of moderate to high daily risk.',
               '<span class="moderate">Moderate risk</span> indicates 2 or 3 days',
               'of moderate to high daily risk.',
               '<span class="no_risk">Low risk</span> indicates 2 or fewer days with',
               'moderate risk.',
               '</p>',
               '<h3>Reference</h3>',
               '<p>Danneberger, T.K., J.M. Vargas Jr., and A.L. Jones, 1984:',
               '<i>A model for weather-based forecasting of anthracnose on annual bluegrass.</i>',
               'Phytopathology, 74, 448-451.</p>'
              ].join(' '),

      bpatch:['<h3>About Brown Patch Disease Risk</h3>',
              '<p>Brown Patch risk index is based on the model of ......',
             '<p>On a daily basis,',
             '<span class="high">High risk</span> indicates ...', 
             '<span class="moderate">Moderate risk</span> indicates ...',
             '<span class="no_risk">Low risk</span> indicates ...',
             '</p>',
             '<p>On a weekly basis',
             '<span class="high">High risk</span> indicates ...',
             '<span class="moderate">Moderate risk</span> indicates ...',
             '<span class="no_risk">Low risk</span> indicates ...',
             '</p>',
             '<h3>Reference</h3>',
             '<p>Fidanza et al. (1996) ...<p>'
              ].join(' '),

      dspot:['<h3>About Dollarspot Disease Risk</h3>',
             '<p>Dollarspot risk is a function of relative humidity, temperature, leaf',
             'wetness hours and the number of consecutive days with rain.',
             'The Dollarspot risk index used here is based on the models of Mills and',
             'Rothwell (1982) and Hall (1984) with slight modifications for compatibility',
             'with available regional weather observations.</p>',
             '<p>On a daily basis',
             '<span class="high">High risk</span> indicates ...', 
             '<span class="moderate">Moderate risk</span> indicates ...',
             '<span class="no_risk">Low risk</span> indicates ...',
             '</p>',
             '<p>On a weekly basis,',
             '<span class="high">High risk</span> indicates ...',
             '<span class="moderate">Moderate risk</span> indicates ...',
             '<span class="no_risk">Low risk</span> indicates ...',
             '</p>',
             '<h3>References</h3>',
             '<p>Mills and Rothwell (1982) ...<p>',
             '<p>Hall (1984) ...<p>',
            ].join(' '),

      pblight:['<h3>About Pythium Blight Disease Risk</h3>',
             '<p>The Pythium Blight risk index',
             'is based on the model of ......',
             '<p>On a daily basis,',
             '<span class="high">High risk</span> indicates ...', 
             '<span class="moderate">Moderate risk</span> indicates ...',
             '<span class="no_risk">Low risk</span> indicates ...',
             '</p>',
             'On a weekly basis',
             '<span class="high">High risk</span> indicates ...',
             '<span class="moderate">Moderate risk</span> indicates ...',
             '<span class="no_risk">Low risk</span> indicates ...',
             '</p>',
             '<h3>Reference</h3>',
             '<p>Nutter et al. (1983) ...<p>'
            ].join(' '),

      hstress:['<h3>About the Heat Stress Index</h3>',
               '<p>Heat stress occurs when the sum of the temperature (°F) and Relative',
               'Humidity (%) exceeds 150 during any nighttime (8:00 pm through 8:00 am)',
               'hour.</p>',
               '<p>On a daily basis,',
               '<span class="high">high risk</span> indicates 8 or more heat stress hours.',
               '<span class="moderate">Moderate risk</span> indicates 4 to 7 heat stress hours.',
               '<span class="no_risk">Low risk</span> indicates fewer 4 heat stress hours.',
               '</p>',
               '<p>On a weekly basis,',
               '<span class="high">High risk</span> indicates consistent (typically',
               'more than 4 days) moderate risk during the week.',
               '<span class="moderate">Moderate risk</span> indicates 3 or 4 moderate',
               'risk days.',
               '<span class="no_risk">low risk</span> indicates for two or fewer moderate',
               'risk days.',
               '</p>',
               '<p>Forecast data are based on National Weather Service forecast guidance.</p>'
              ].join(' '),

      gdd32:{
        forecast:['<h3>About This Map</h3>',
            '<p>This map shows the forecast for base 32°F GDD accumulation over',
            'the next week. The forecast is based on guidance from the National',
            'Weather Service 7-day temperature forecast.</p>',
            '<p>Growing degree days (GDD) are a means by which turf and weed',
            'development can be monitored. Base 32°F GDD accumulation is an',
            'experimental measure for predicting ideal annual bluegrass seedhead',
            'development and potential assessment with plant growth regulators.',
            'Preliminary data suggests that the ideal application time might be',
            'from 400 to 600 GDD for Proxy and 500 to 650 GDD for Embark.</p>'
           ].join(' '),
        last7days:['<h3>About This Map</h3>',
            '<p>This map shows base 32°F GDD accumulation over the last 7 days.</p>',
            '<p>Growing degree days (GDD) are a means by which turf and weed',
            'development can be monitored. Base 32°F GDD accumulation is an',
            'experimental measure for predicting ideal annual bluegrass seedhead',
            'development and potential assessment with plant growth regulators.',
            'Preliminary data suggests that the ideal application time might be',
            'from 400 to 600 GDD for Proxy and 500 to 650 GDD for Embark.</p>'
            ].join(' '),
      },

      gdd50:{
        diffdays:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>In terms of days, the GDD comparisons are able to',
              'answer the question, "When during the previous growing season did',
              'the current 50°F GDD accumulation occur ?" A mapped value of -7',
              'indicates that the current season is 7 days behind the previous',
              'year\'s accumulation. If 58 GDD were accumulated on April 7, 2017,',
              'a value of -7 would indicate that 58 GDD had already been accumulated',
              'on April 1, 2016.</p>'
             ].join(' '),
        diffgdd:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>In terms of GDD, the comparisons are able to',
              'answer the question, "How different is the GDD accumulation in the',
              'current growing season from the same day in the previous season ?"',
              'A mapped value of -25 indicates that the GDD accummulation in the',
              'current year is 25 GGD less than was accumulated in the previous',
              'year. For example, if 48 GDD have accumulated by April 7 this',
              'year, a value of -25 would indicate that 73 GDD had already been',
              'accumulated by April 7 of the previous year.</p>'
             ].join(' '),
        forecast:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>This map shows the forecast for base 50°F GDD',
              'accumulation over the next week. The forecast is based on guidance from',
              'the National Weather Service 7-day temperature forecast.</p>'
             ].join(' '),
        last7days:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>This map shows the number of base 50°F growing degree',
              'days (GDD) that have accumulated over the last 7 days.</p>'
             ].join(' '),
        normdiffdays:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>In terms of days, the GDD comparisons are able to',
              'answer the question, \"When during an average growing season did',
              'the current 50°F GDD accumulation occur ?\" A mapped value of -7',
              'indicates that the current season is 7 days behind the average',
              'season accumulation.</p><p>For example, if 58 GDD have accumulated',
              'by April 7 of this year, then a value of -7 would indicate that',
              'historically, an average of 58 GDD have already accumulated by',
              'April 1.</p>'
             ].join(' '),
        normdiffgdd:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>In terms of GDD, the comparisons are able to',
              'answer the question, "When during an average growing season did',
              'the current 50°F GDD accumulation occur ?" A mapped value of 22',
              'indicates that GDD accumulation in the current season is greater',
              'the historical average accumulation.</p><p>For example, if 78 GDD',
              'have been accumulated by April 7 of the current year, a value of',
              '22 would indicate that, historically, an average of only 53 GDD',
              'have accumulated by April 7.</p>'
             ].join(' '),
        season:['<h3>About This Map</h3>',
              '<p>Degree days are a means by which turf and weed development can be',
              'monitored.</p><p>This map shows the total accumulation of base 50°F',
              'GDD from March 15 until the current day.</p>'
             ].join(' '),
      },

      irrigate:{
        evapot:['<h3>About This Map</h3>',
              '<p>The Penman Monteith equation is used to calculate the total',
              'potential evapotranspiration (inches) over the last 7 days at',
              'approximately 200 sites used to generate this map.</p>'
             ].join(' '),
        moisdef:['<h3>About This Map</h3>',
              '<p>Moisture deficit is the difference between rainfall and',
              'evapotranspiration.</p><p>This map depicts total mositure deficet',
              'for the past week. Negative values indicate that evapotranspiration',
              'exceeded precipitation. Positive values indicate the precipitation',
              'exceeded evapotranspiration.</p><p>Data on this map is useful for',
              'assessing irrigation requirements.</p>'
             ].join(' '),
        moisdefcst:['<h3>About This Map</h3>',
              '<p>Moisture deficit is the difference between rainfall and',
              'evapotranspiration.</p><p>This map displays the forecast moisture deficit',
              'for the next 3-days. Negative values indicate that evapotranspiration',
              'will exceeded precipitation over the next 3 days. Positive values',
              'indicate the precipitation will exceed evapotranspiration.</p><p>Data on',
              'this map is useful for assessing irrigation requirements.</p>'
             ].join(' '),
        rainfall:['<h3>About This Map</h3>',
              '<p>Approximately 700 rain gauge sites are used to map the total',
              'rainfall (inches) observed over the last 7 days.</p>'
             ].join(' '),
      },
      temperature:{
        departure:['<h3>About This Map</h3>',
              '<p>The average of the temperatures over past 30 years on any particular',
              'day is commonly called the "normal". As depicted here, "departure" is',
              'the difference between the average temperature (°F) over the last 7 days',
              'and average of the normal temperatures for the same 7 days.</p>',
              '<p>Negative values indicate areas where temperatures are cooler than',
              'normal. Positive values indicate areas where temperatures are warmer',
              'than normal.</p>',
             ].join(' '),
        soil2in:['<h3>About This Map</h3>',
              '<p>Temperature (°F) of the soil 2" below the surface.</p>'
             ].join(' '),
      },
    }  
  }

  description = function(text_key) {
    console.log('TurfTextStore dcescription('+text_key+')')
    if (text_key.includes('.')) {
      let keys = text_key.split('.');
      return this.descriptions[keys[0]][keys[1]];
    } else {
      return this.descriptions[text_key];
    }
  }

}

