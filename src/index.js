import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import firebase from './firebase.js';
console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
