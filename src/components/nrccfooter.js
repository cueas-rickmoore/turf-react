import React from 'react';

class NRCCFooter extends React.Component {

  render() {
    return (
      <div id="nrcc-footer">
        <div id="nrcc-footer-main">
          <div id="nrcc-footer-left">
            <p className="nrcc-contact">Contact NRCC</p>
            <p>1123 Bradfield Hall, Cornell University, Ithaca, NY 14853 </p>
            <p>Phone: 607-255-1751 | Fax: 607-255-2106</p>
            <p>Email:<a href="mailto:nrcc@cornell.edu?Subject=ForeCast%20feedback">nrcc@cornell.edu</a> </p>
          </div>
          <div id="nrcc-footer-right">
            <div className="logo-1">
              <a href="http://turf.cals.cornell.edu" rel="noopener noreferrer" target="_blank">
              <img className="logo-img" src="../images/CUTurfLogo.jpg" alt="Turfgrass Logo" /></a>
            </div>
            <div className="logo-2">
              <a href="http://www.nrcc.cornell.edu" rel="noopener noreferrer" target="_blank">
              <img className="nrcc-logo-img" src="../images/nrcc-logo-square.png" alt="NRCC Logo" /></a>
            </div>
            <div className="logo-3">
              <a href="https://www.ncdc.noaa.gov/customer-support/partnerships/regional-climate-centers" rel="noopener noreferrer" target="_blank">
              <img className="logo-img" src="../images/noaa-rcc-logo.png" alt="RCC Logo" /></a>
            </div>
          </div>
        </div>
        <div className="copyright">© 2015-2018 Northeast Regional Climate Center</div>
      </div>
    )
  }

}

export default NRCCFooter;
