import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { version } from '../package.json';
import './index.css';

// const history = createBrowserHistory();
// const store = configureStore(history);

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
      <Routes />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('app')
);

// registerServiceWorker();
console.log(`Version ${version}`);