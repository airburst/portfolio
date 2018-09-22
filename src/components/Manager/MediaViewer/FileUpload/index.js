import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { graphql } from 'react-apollo';
import './FileUpload.css';
import { allPhotosQuery, uploadPhotoMutation } from '../../../../queries';
import batch from '../../../../services/batch';

const FileUpload = props => {
  let dropzoneRef;
  const { uploadResponseHandler, closeHandler, setUploadSizes, mutate } = props;

  const buttonHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    dropzoneRef.open();
  };

  const doUpload = file =>
    mutate({
      variables: { file },
      refetchQueries: [{ query: allPhotosQuery }],
    })
      .then(response => uploadResponseHandler(response))
      .catch(err => console.log('Error', err.message));

  const onDrop = files => {
    if (files.length) {
      const sizes = files.map(f => f.size);
      setUploadSizes(sizes);
      batch()(files, doUpload);
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
  setUploadSizes: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default graphql(uploadPhotoMutation)(FileUpload);
