import React, { Component } from 'react';
import routeConfig from './route';
import { Router, browserHistory } from 'react-router';

class App extends Component {
  render() {
    return <Router routes = { routeConfig } history = { browserHistory }
    />;
  }
}

export default App;