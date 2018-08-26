import React from 'react';
import Dropzone from './Dropzone';
import './FileUpload.css';

const Picture = ({ thumbnail }) => {
  console.log(thumbnail);
  return (
    <div className="small-photo">
      <img src={thumbnail} alt="" />
    </div>
  );
};

class FileUploadZone extends React.Component {
  state = {
    thumbnail: null,
  };

  handleUploadResponse = ({ data }) => {
    console.log({ data });
    const {
      uploadPhoto: { success, thumbnail },
    } = data;
    if (success) {
      this.setState({ thumbnail });
    }
  };

  render() {
    return (
      <div className="upload-container">
        <Dropzone handleUploadResponse={this.handleUploadResponse} />
        {/* <FileUpload
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
          disableClick
          handleUploadResponse={this.handleUploadResponse}
        >
          <div className="upload-zone" />
        </FileUpload> */}
        <Picture thumbnail={this.state.thumbnail} />
      </div>
    );
  }
}

export default FileUploadZone;
