import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import Dama from './components/dama';
import Store from './store';
import './index.css';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../node_modules/font-awesome/css/font-awesome.css';

// ========================================

const store = Store();

// store.subscribe(()=> console.log(store.getState()))

ReactDOM.render(
    <Provider store={store}>
        <Dama />
    </Provider>,
  document.getElementById('root')
);
