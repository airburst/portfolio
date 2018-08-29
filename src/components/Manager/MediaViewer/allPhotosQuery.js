import gql from 'graphql-tag';

export default gql`
  {
    allPhotos {
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
