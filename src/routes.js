import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Manager from './components/Manager';
// import PropTypes from 'prop-types';
import './index.css';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Manager} />
    <Route path="/manager" exact component={Manager} />
  </Switch>
);

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header style="dark"/>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
