import gql from 'graphql-tag';

export const albumsQuery = gql`
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
