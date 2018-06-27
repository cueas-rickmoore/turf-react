import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';
import createHistory from "history/createBrowserHistory";

import './index.css';
import App from './App';
import Stores from "./stores";

// history
//const history = createHistory({ basename: "" });
const history = createHistory({ basename: process.env.REACT_APP_HISTORY_BASE });
// stores and Mobx
const stores = new Stores(history);

const render = Component => {
  ReactDOM.render(
    <Provider stores={stores}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

render();

registerServiceWorker();

