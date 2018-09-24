import gql from 'graphql-tag';

export const publicAlbumsQuery = gql`
  {
    allAlbums {
      data {
        id
        name
        description
        cover
      }
      errors {
        path
        message
      }
    }
  }
`;
