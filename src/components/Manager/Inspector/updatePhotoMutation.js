import gql from 'graphql-tag';

const uploadPhotosMutation = gql`
  mutation updatePhoto($photo: PhotoInput) {
    updatePhoto(photo: $photo)
  }
`;

export default uploadPhotosMutation;
