import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import Routes from './routes';
import ServerContext, { serverUrl } from './ServerContext';
import { version } from '../package.json';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ServerContext.Provider value={serverUrl}>
        <Routes />
      </ServerContext.Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app')
);

// registerServiceWorker();
console.log(`Version ${version}`);
