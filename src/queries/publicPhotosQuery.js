import gql from 'graphql-tag';
// TODO: write query on server!
export const publicPhotosQuery = gql`
  query publicPhotos($albumId: Int) {
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
