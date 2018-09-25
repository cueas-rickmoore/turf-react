# Turf Grass Development and Health Maintenance Website for the Northeastern US.

React-based user interface to view information that is helpful in understanding develpopment of turf grass and potential weather-related threats in the Northeastern United States.

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 6 and npm >= 5.2 on your machine. To create a project, run:

### Prerequisites

You’ll need to have Node >= 6 installed on your computer. If not already installed, use the instructions from [NodeJS.org](https://nodejs.org/en/download/package-manager/)

### Dependencies

This version of the app uses decorators, so you must install versions of react, create-react-app and mobx that support decorators. See the [examples.packages.json](examples.packages.json) for the versions these products that we use.

**REQUIRES** maps, thumbnails and json data files generated using code from the ** __turf-models__ ** repository. Do not put this data in the **__public__** directory. Data volume is very high and may bog the system down during development. We use Apache or NginX to handle data requests on dedicated servers even in development.

### Creating the React instance

**1) install __create-react-app__  the directory where NodeJS is installed**

     npm install -g create-react-app

**2) create the base React instance**

     npm create-react-app turf

**3) download the Turf Grass code into the _turf_  directory** generated in the previous step. _It is OK for the downloaded code to replace the default App.js, tsconfig.json and the entire src directory._

**4) install React dependencies** listed in the distribution's _example.package.json_ file.

### Environment Variables

Three environment variables are set in the .env.build and .env.development files

**REACT_APP_COMMON_URL** is the path to the top directory where static images and location picker code files are stored.

**REACT_APP_DATA_URL** is the path to the top directory where maps, thumbnails and json data files are stored.

**REACT_APP_ROOT_URL** is the root path where all external turf data and code was stored. **THIS IS NOT USED SINCE RELEASE 1.0.0**

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/cueas-rickmoore/turf-react/tags). 

## Authors

* [**Rick Moore**](https://github.com/cueas-rickmoore)

## License

This project is &copy; 2017-2018 and licensed under the GNU General Public License, Version 3, 29 June 2007 - see the [copyright.txt](copyright.txt) and [GPLv3](GPLv3) files for details.

## Acknowledgments

* [Dr. Arthur DeGaetano](http://www.eas.cornell.edu/people/profile.cfm?netid=atd2_eng) Professor and Director of the Northeast Regional Climate Center, sponsor and mentor for this project.
* [Alex Sinfarosa](https://github.com/alexsinfarosa) provided invaluable technical assistance with the intricacies of the create-react-app development environement.

