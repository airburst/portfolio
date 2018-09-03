import gql from 'graphql-tag';

const albumsQuery = gql`
  {
    allAlbums {
      data {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export default albumsQuery;
