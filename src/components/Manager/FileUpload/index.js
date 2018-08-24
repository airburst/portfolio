import React from 'react';
import Dropzone from './Dropzone';
import './FileUpload.css';

const Pictures = ({ files }) =>
  files.filter(f => f.indexOf('200h') > -1).map(file => (
    <div className="small-photo" key={file}>
      <img src={file} alt="" />
    </div>
  ));

class FileUploadZone extends React.Component {
  state = {
    files: [],
  };

  handleUploadResponse = ({ data }) => {
    console.log({ data });
    const {
      uploadPhoto: { success, files },
    } = data;
    if (success) {
      this.setState({ files });
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
        <Pictures files={this.state.files} />
      </div>
    );
  }
}

export default FileUploadZone;
