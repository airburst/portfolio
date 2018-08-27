import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './FileUpload.css';
import allPhotosQuery from '../allPhotosQuery';

const FileUpload = props => {
  let dropzoneRef;
  const {
    uploadResponseHandler,
    closeHandler,
    setUploadPreviews,
    mutate,
  } = props;

  const buttonHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    dropzoneRef.open();
  };

  const onDrop = files => {
    if (files.length) {
      setUploadPreviews(files.map(f => f.preview));
      mutate({
        variables: { files },
        refetchQueries: [
          {
            query: allPhotosQuery,
          },
        ],
      })
        .then(response => uploadResponseHandler(response))
        .catch(err => console.log('Error', err.message));
    }
  };

  return (
    <div className="upload-container">
      <Icon name="close" size="big" className="close" onClick={closeHandler} />
      <Dropzone
        ref={node => {
          dropzoneRef = node;
        }}
        className="dropzone"
        accept="image/jpeg, image/png"
        onDrop={onDrop}
      >
        <p className="dropzone-text">Drop image files to upload</p>
        <Button onClick={buttonHandler} content="Or Click to Select Files" />
      </Dropzone>
    </div>
  );
};

FileUpload.propTypes = {
  mutate: PropTypes.func.isRequired,
  uploadResponseHandler: PropTypes.func.isRequired,
  setUploadPreviews: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

// GQL Mutation
const uploadPhotosMutation = gql`
  mutation uploadPhotos($files: [Upload!]!) {
    uploadPhotos(files: $files) {
      success
      error
      thumbnail
    }
  }
`;

export default graphql(uploadPhotosMutation)(FileUpload);
