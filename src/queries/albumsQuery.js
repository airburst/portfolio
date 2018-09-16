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
        photos {
          id
          thumbnail
        }
      }
      errors {
        path
        message
      }
    }
  }
`;
