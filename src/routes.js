import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Manager from './components/Manager';
import FileUpload from './components/Manager/FileUpload';
import './index.css';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/manager" exact component={Manager} />
    <Route path="/upload" exact component={FileUpload} />
  </Switch>
);

const App = () => (
  <div className="wrapper">
    <Header />
    <Routes />
  </div>
);

export default withRouter(App);
