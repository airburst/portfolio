import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import Thumbnails, { Previews } from './Thumbnails';
import allPhotosQuery from './allPhotosQuery';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  state = {
    // search: '', // TODO: use search
    showUploads: false,
    uploadPreviews: null,
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  uploadClickHandler = () => {
    this.setState({ showUploads: true });
  };

  uploadResponseHandler = ({ data }) => {
    const { uploadPhotos } = data;
    if (uploadPhotos && uploadPhotos.length) {
      this.setState({ uploadPreviews: null });
    }
  };

  hideUploads = () => this.setState({ showUploads: false });

  setUploadPreviews = previews => {
    this.setState({ uploadPreviews: previews });
  };

  render() {
    const {
      data: { allPhotos },
    } = this.props;
    const { showUploads, uploadPreviews } = this.state;

    return (
      <div className="media-section">
        <Toolbar
          onSearchChange={v => this.onChange('search', v)}
          uploadClickHandler={this.uploadClickHandler}
        />

        {showUploads && (
          <FileUpload
            closeHandler={this.hideUploads}
            setUploadPreviews={this.setUploadPreviews}
            uploadResponseHandler={this.uploadResponseHandler}
          />
        )}

        <div className="media-container">
          <div className="media">
            {uploadPreviews &&
              uploadPreviews.length && <Previews photos={uploadPreviews} />}
            <Thumbnails photos={allPhotos} />
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(allPhotosQuery)(MediaViewer);
