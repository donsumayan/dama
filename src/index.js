import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Dama from './components/dama';
import store from './store';
import './index.css';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../node_modules/font-awesome/css/font-awesome.css';
import 'react-bootstrap';

// ========================================

ReactDOM.render(
    <Provider store={store}>
        <Dama />
    </Provider>,
  document.getElementById('root')
);
