import gql from 'graphql-tag';

export const uploadPhotoMutation = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      name
      success
      error
      thumbnail
    }
  }
`;
// export const uploadPhotoMutation = gql`
//   mutation uploadPhoto($file: Upload!, $size: Int!) {
//     uploadPhoto(file: $file, size: $size) {
//       success
//       error
//       thumbnail
//     }
//   }
// `;
