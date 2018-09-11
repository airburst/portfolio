import gql from 'graphql-tag';

export const addAlbumMutation = gql`
  mutation addAlbum($album: AlbumInput!) {
    addAlbum(album: $album)
  }
`;
