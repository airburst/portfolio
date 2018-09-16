import gql from 'graphql-tag';

export const updateAlbumMutation = gql`
  mutation updateAlbum($album: AlbumInput!) {
    updateAlbum(album: $album)
  }
`;
