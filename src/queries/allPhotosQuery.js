import gql from 'graphql-tag';

export const allPhotosQuery = gql`
  query allPhotos($albumId: Int) {
    allPhotos(albumId: $albumId) {
      data {
        id
        name
        urls
        thumbnail
        title
        caption
        width
        height
        exposure
        shutter
        aperture
        iso
        focalLength
        dateTaken
        isPublic
        createdAt
      }
      errors {
        path
        message
      }
    }
  }
`;
