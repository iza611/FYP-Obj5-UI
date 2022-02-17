import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import { ipcRenderer } from 'electron';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const { ipcRenderer } = require('electron');
// ipcRenderer.send('request-port');
// ipcRenderer.on('reply-port', (event, arg) => {
//   console.log("Hiii", arg);
// });