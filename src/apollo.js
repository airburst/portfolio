import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';

const uri = 'http://localhost:3001/graphql';
const wsUri = 'ws://localhost:3001/graphql';

const httpLink = createUploadLink({ uri });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const {
      response: { headers },
    } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');
      if (token) {
        localStorage.setItem('token', token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    return response;
  })
);

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

// Subscriptions setup
export const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    }),
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddleware
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// export default new ApolloClient({
//   link: httpLinkWithMiddleware,
//   cache: new InMemoryCache(),
// });
