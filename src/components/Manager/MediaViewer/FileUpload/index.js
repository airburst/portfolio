import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './FileUpload.css';

const FileUpload = props => {
  let dropzoneRef;
  const { handleUploadResponse, mutate } = props;

  const buttonHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    dropzoneRef.open();
  };

  const onDrop = files => {
    if (files.length) {
      files.forEach(file => {
        mutate({ variables: { file } })
          .then(response => handleUploadResponse(response))
          .catch(err => console.log('Error', err.message));
      });
    }
  };

  return (
    <div className="upload-container">
      <Dropzone
        ref={node => {
          dropzoneRef = node;
        }}
        className="dropzone"
        // accept="image/jpg" //TODO: restrict type
        onDrop={onDrop}
      >
        <p className="dropzone-text">Drop image files to upload</p>
        <Button onClick={buttonHandler} content="Or Click to Select Files" />
      </Dropzone>
    </div>
  );
};

FileUpload.propTypes = {
  handleUploadResponse: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

const uploadPhotoMutation = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      success
      error
      thumbnail
    }
  }
`;

export default graphql(uploadPhotoMutation)(FileUpload);
