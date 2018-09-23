import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import Home from './components/Home';
import Login from './components/Login';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Manager from './components/Manager';
import './index.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    const { exp } = decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/gallery" exact component={Gallery} />
    <PrivateRoute path="/manager" exact component={Manager} />
  </Switch>
);

const App = () => (
  <div className="wrapper">
    <Header />
    <Routes />
  </div>
);

export default withRouter(App);
