import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const uri = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/graphql';

const httpLink = createUploadLink({
  uri,
  credentials: 'include',
});

export default new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
