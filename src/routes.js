import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Manager from './components/Manager';
// import PropTypes from 'prop-types';
import './index.css';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/manager" exact component={Manager} />
  </Switch>
);

// TODO: header isDark is derived from state.authenticated user

const App = () => (
  <div className="wrapper">
    <Header isDark />
    <Routes />
  </div>
);

export default withRouter(App);
