
export default class TurfTextStore {
  app;
  constructor(app) {
    this.app = app;

    this.descriptions = {
        anthrac:['<h3>About Anthracnose Disease Risk</h3><p>The Anthracnose risk index',
                 'is based on the model of Danneberger et al. (1984) (with slight',
                 'modifications for compatibility with NWS gridded weather data) that',
                 'uses a combination of hourly leaf wetness and temperature to estimate',
                 'the risk of an outbreak. On a daily basis,',
                 '<span class="high">High risk</span> is also indicated when .....', 
                 '<span class="moderate">Moderate risk</span> occurs when .....',
                 '<span class="no_risk">Low risk</span> otherwise.',
                 '<span class="high">High risk</span> is also indicated for weeks of',
                 'consistent (typically more than 4 days) moderate to high daily risk.',
                 '<span class="moderate">Moderate risk</span> indicates between 2 and',
                 '3 days of moderate to high daily risk. Weeks with',
                 '<span class="no_risk">low risk</span> have two or fewer moderate risk',
                 'days. <h3>Reference</h3>',
                 '<p>Danneberger, T.K., J.M. Vargas Jr., and A.L. Jones, 1984:',
                 'A model for weather-based forecasting of anthracnose on annual bluegrass.',
                 'Phytopathology, 74, 448-451.</p>'].join(' '),
        hstress:['<h3>About the Heat Stress Index</h3><p>Heat stress is defined as a',
                 ' nighttime (8:00 pm through 8:00 am) hour when the sum of the temperature',
                 '(°F) and Relative Humidity (%) exceeds 150. On a daily basis,',
                 '<span class="high">high risk</span> corresponds to eight or more heat',
                 'stress hours. <span class="no_risk">Low risk</span> days have fewer',
                 'than four heat stress hours. <span class="moderate">Moderate risk</span>',
                 'occurs otherwise. <span class="high">High risk</span> is also indicated',
                 'for weeks of consistent (typically more than 4 days) moderate risk.',
                 'Weeks with <span class="no_risk">low risk</span> have two or fewer',
                 'moderate risk days. <span class="moderate">Moderate risk</span> is',
                 'indicated otherwise.</p><p>Forecast data are based on National Weather',
                 'Service forecast guidance.</p>'].join(' '),
    }

  }
  description = () => { return this.descriptions[this.app.model.data_model.name] }
}

