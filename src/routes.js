import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Loadable from 'react-loadable';
import Header from './components/Header';
import './index.css';

export const isAuthenticated = () => {
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

const Loading = () => <div>Loading...</div>;

// const LoadableHome = Loadable({
//   loader: () => import('./components/Home'),
//   loading: Loading,
// });

const LoadableGalleries = Loadable({
  loader: () => import('./components/Galleries'),
  loading: Loading,
});

const LoadableLogin = Loadable({
  loader: () => import('./components/Login'),
  loading: Loading,
});

const LoadableGallery = Loadable({
  loader: () => import('./components/Gallery'),
  loading: Loading,
});

const LoadableManager = Loadable({
  loader: () => import('./components/Manager'),
  loading: Loading,
});

const Routes = () => (
  <Switch>
    <Route path="/" exact component={LoadableGalleries} />
    <Route path="/login" exact component={LoadableLogin} />
    <Route path="/galleries" exact component={LoadableGalleries} />
    <Route path="/gallery/:id" exact component={LoadableGallery} />
    <PrivateRoute path="/manager" exact component={LoadableManager} />
  </Switch>
);

const App = () => (
  <div className="wrapper">
    <Header auth={isAuthenticated()} />
    <Routes />
  </div>
);

export default withRouter(App);
