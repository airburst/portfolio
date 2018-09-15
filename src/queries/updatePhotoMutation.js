import gql from 'graphql-tag';

export const updatePhotoMutation = gql`
  mutation updatePhoto($photo: PhotoInput!) {
    updatePhoto(photo: $photo)
  }
`;
