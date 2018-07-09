import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store'
import './polyfills';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
