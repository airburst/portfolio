import gql from 'graphql-tag';

export const albumsQuery = gql`
  {
    allAlbums {
      data {
        id
        name
        slug
        description
        cover
        isPublic
        photos {
          id
          thumbnail
          urls
        }
      }
      errors {
        path
        message
      }
    }
  }
`;
