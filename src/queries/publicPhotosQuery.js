import gql from 'graphql-tag';

export const publicPhotosQuery = gql`
  query publicPhotos($albumId: String) {
    publicPhotos(albumId: $albumId) {
      data {
        id
        name
        urls
        title
        caption
        width
        height
      }
      errors {
        path
        message
      }
    }
  }
`;
