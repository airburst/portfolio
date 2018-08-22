import React from 'react';
import FileUpload from './FileUpload';
import './FileUpload.css';

const Pictures = ({ files }) =>
  files.map(file => <img key={file} src={file} alt="" />);

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
      <React.Fragment>
        <FileUpload
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
          disableClick
          handleUploadResponse={this.handleUploadResponse}
        >
          <div className="upload-zone" />
        </FileUpload>
        <Pictures files={this.state.files} />
      </React.Fragment>
    );
  }
}

export default FileUploadZone;
