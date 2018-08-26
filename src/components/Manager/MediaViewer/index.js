import React from 'react';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import Thumbnail from './Thumbnail';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  state = {
    // search: '', // TODO: use search
    showUploads: false,
    thumbnail: null,
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  uploadClickHandler = () => {
    this.setState({ showUploads: true });
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
    const { showUploads, thumbnail } = this.state;
    console.log('​render -> thumbnail', thumbnail);

    return (
      <div className="media-section">
        <Toolbar
          onSearchChange={v => this.onChange('search', v)}
          uploadClickHandler={this.uploadClickHandler}
        />

        {showUploads && (
          <FileUpload handleUploadResponse={this.handleUploadResponse} />
        )}

        <div className="media-container">
          <div className="media">
            <Thumbnail src="https://source.unsplash.com/random/150x100" />
          </div>
        </div>
      </div>
    );
  }
}

export default MediaViewer;
