const mapDiv = document.getElementById('map');
const NoMatch = () => <p>Page Not Found</p>;

import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import MarkerList from '../src/MarkerList.jsx';
import MapComponent from '../src/MapComponent.jsx';
import styles from '../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={MapComponent} />
    <Route path="/markers" component={MarkerList} />
    <Route path="*" component={NoMatch} />
  </Router>
);
  
ReactDOM.render(<App />, mapDiv);

if (module.hot) {
  module.hot.accept();
}