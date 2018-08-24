import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UploadDropzone = props => {
  let dropzoneRef;
  const { handleUploadResponse, mutate } = props;

  const buttonHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    dropzoneRef.open();
  };

  const onDrop = files => {
    console.log('files', files);
    if (files.length) {
      files.forEach(file => {
        mutate({ variables: { file } })
          .then(response => handleUploadResponse(response))
          .catch(err => console.log('Error', err.message));
      });
    }
  };

  return (
    <Dropzone
      ref={node => {
        dropzoneRef = node;
      }}
      className="dropzone"
      // accept="image/jpg"
      onDrop={onDrop}
    >
      <Icon name="upload" size="huge" />
      <p className="dropzone-text">Drop image files to upload</p>
      <Button onClick={buttonHandler} content="Or Click to Select File" />
    </Dropzone>
  );
};

UploadDropzone.propTypes = {
  handleUploadResponse: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

const uploadPhotoMutation = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      success
      exif
      error
      files
    }
  }
`;

export default graphql(uploadPhotoMutation)(UploadDropzone);
