import gql from 'graphql-tag';

export const addPhotosToAlbumMutation = gql`
  mutation addPhotosToAlbum($albumId: Int!, $photoIds: [Int!]!) {
    addPhotosToAlbum(albumId: $albumId, photoIds: $photoIds) {
      data
      errors {
        message
      }
    }
  }
`;
