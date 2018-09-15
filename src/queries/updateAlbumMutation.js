import gql from 'graphql-tag';

export const updateAlbumMutation = gql`
  mutation updateAlbum($Album: AlbumInput!) {
    updateAlbum(Album: $Album)
  }
`;
