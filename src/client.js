import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

let socket = io();

socket.on('connect', () => {
  console.log('connected on client');
});



const renderApp = () => {
  ReactDOM.render(<AppContainer><App/></AppContainer>, document.getElementById('app'));
};

window.onload = () => {
  renderApp();
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const App = require('./components/App').default;
    renderApp();
  });
}
