import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import App from './components/App';
import * as serviceWorker from './extra/serviceWorker';
import { DataLayer } from './DataLayer';

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState reducer>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
