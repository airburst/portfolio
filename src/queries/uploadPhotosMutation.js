import gql from 'graphql-tag';

export const uploadPhotosMutation = gql`
  mutation uploadPhotos($files: [Upload!]!, $sizes: [Int!]) {
    uploadPhotos(files: $files, sizes: $sizes) {
      name
      success
      error
      thumbnail
    }
  }
`;
