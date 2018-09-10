import gql from 'graphql-tag';

export default gql`
  {
    allBinItems {
      photos {
        id
        name
      }
      albums {
        id
        name
      }
      errors {
        message
      }
    }
  }
`;
