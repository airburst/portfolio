import React from 'react';
import FileUpload from './FileUpload';
import './FileUpload.css';

const FileUploadZone = () => (
  <FileUpload
    style={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    }}
    disableClick
  >
    <div className="upload-zone" />
  </FileUpload>
);

export default FileUploadZone;
