import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

//Mobx
import { Provider } from 'mobx-react';
import { TurfAppDataStore } from "./stores/appstore";

// hot reload
import { AppContainer } from "react-hot-loader";

const store = new TurfAppDataStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

registerServiceWorker();

// Render once
render(App);

if (module.hot) {
  module.hot.accept("stores/appstore", () => {
    render(App);
  });
}
