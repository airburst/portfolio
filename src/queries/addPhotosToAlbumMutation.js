import gql from 'graphql-tag';

const addPhotosToAlbumMutation = gql`
  mutation addPhotosToAlbum($albumId: Int!, $photoIds: [Int!]!) {
    addPhotosToAlbum(albumId: $albumId, photoIds: $photoIds) {
      data
      errors {
        message
      }
    }
  }
`;

export default addPhotosToAlbumMutation;
