import gql from 'graphql-tag';

export const addToBinMutation = gql`
  mutation addToBin($type: String!, $ids: [Int!]!, $albumId: Int) {
    addToBin(type: $type, ids: $ids, albumId: $albumId)
  }
`;
