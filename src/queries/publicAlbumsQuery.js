import gql from 'graphql-tag';

export const publicAlbumsQuery = gql`
  {
    getPublicAlbums {
      data {
        id
        name
        slug
        description
        cover
        views
      }
      errors {
        path
        message
      }
    }
  }
`;
