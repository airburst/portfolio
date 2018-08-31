import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';
import allPhotosQuery from '../MediaViewer/allPhotosQuery';

class DeletePhotoButton extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    id: PropTypes.number,
  };

  static defaultProps = {
    id: null,
  };

  clickHandler = () => {
    const { id } = this.props;
    this.props
      .mutate({
        variables: { id },
        refetchQueries: [
          {
            query: allPhotosQuery,
          },
        ],
      })
      .then(() => this.props.clear())
      .catch(err => console.log('Error', err.message));
  };

  render() {
    return (
      <Button
        secondary
        size="mini"
        className="delete-photo-button"
        onClick={this.clickHandler}
        content="Delete"
      />
    );
  }
}

const deletePhotoMutation = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id)
  }
`;

export default graphql(deletePhotoMutation)(DeletePhotoButton);
