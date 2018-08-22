import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const FileUpload = ({ children, disableClick, mutate, style = {} }) => (
  <Dropzone
    style={style}
    className="ignore"
    onDrop={([file]) => {
      mutate({ variables: { file } })
        .then(response => console.log(response))
        .catch(err => console.log('Error', err.message));
    }}
    disableClick={disableClick}
  >
    {children}
  </Dropzone>
);

FileUpload.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  disableClick: PropTypes.bool,
  mutate: PropTypes.func.isRequired,
  style: PropTypes.object,
};

FileUpload.defaultProps = {
  disableClick: false,
  style: {},
};

const uploadPhotoMutation = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file)
  }
`;

export default graphql(uploadPhotoMutation)(FileUpload);
