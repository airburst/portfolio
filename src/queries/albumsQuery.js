import gql from 'graphql-tag';

export const albumsQuery = gql`
  {
    allAlbums {
      data {
        id
        name
        description
        cover
        isPublic
      }
      errors {
        path
        message
      }
    }
  }
`;
