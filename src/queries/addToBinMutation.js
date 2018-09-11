import gql from 'graphql-tag';

const addToBinMutation = gql`
  mutation addToBin($type: String!, $ids: [Int!]!) {
    addToBin(type: $type, ids: $ids)
  }
`;

export default addToBinMutation;
