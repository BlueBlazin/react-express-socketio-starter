import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

let socket = io();

socket.on('connect', () => {
  console.log('connected on client');
});


window.onload = () => {
  ReactDOM.render(<App/>, document.getElementById('app'));
};
