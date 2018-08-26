import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from './Dropzone';
import './FileUpload.css';

const Picture = ({ thumbnail }) => (
  <div className="small-photo">
    <img src={thumbnail} alt="" />
  </div>
);

Picture.propTypes = {
  thumbnail: PropTypes.string,
};

Picture.defaultProps = {
  thumbnail: null,
};

class FileUploadZone extends React.Component {
  state = {
    thumbnail: null,
  };

  handleUploadResponse = ({ data }) => {
    console.log({ data }); // TODO: remove
    const {
      uploadPhoto: { success, thumbnail },
    } = data;
    if (success) {
      this.setState({ thumbnail });
    }
  };

  render() {
    const { thumbnail } = this.state;
    return (
      <div className="upload-container">
        <Dropzone handleUploadResponse={this.handleUploadResponse} />
        {thumbnail && <Picture thumbnail={thumbnail} />}
      </div>
    );
  }
}

export default FileUploadZone;
