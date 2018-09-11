import gql from 'graphql-tag';

export const addToBinMutation = gql`
  mutation addToBin($type: String!, $ids: [Int!]!) {
    addToBin(type: $type, ids: $ids)
  }
`;
