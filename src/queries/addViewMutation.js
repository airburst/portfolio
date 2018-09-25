import gql from 'graphql-tag';

export const addViewMutation = gql`
  mutation addView($albumId: Int!) {
    addView(albumId: $albumId)
  }
`;
