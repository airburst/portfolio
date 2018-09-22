import gql from 'graphql-tag';

export const uploadProgressSubscription = gql`
  subscription uploadProgress($filename: String!) {
    commentAdded(filename: $filename) {
      progress
    }
  }
`;
