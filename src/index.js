import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './index.css';

import App from './App';

//Mobx
import store from './stores';
import { Provider } from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
