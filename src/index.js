import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

//Mobx
import { Provider } from 'mobx-react';
import stores from "./stores";

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

