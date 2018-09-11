import gql from 'graphql-tag';

export const allBinItemsQuery = gql`
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
