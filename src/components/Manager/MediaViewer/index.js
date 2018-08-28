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
    showUploads: false,
    uploadSizes: null,
    // search: '', // TODO: use search
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
      this.setState({ uploadSizes: null });
    }
  };

  hideUploads = () => this.setState({ showUploads: false });

  setUploadSizes = sizes => {
    this.setState({ uploadSizes: sizes });
  };

  render() {
    const {
      data: { allPhotos },
    } = this.props;
    const { showUploads, uploadSizes } = this.state;

    return (
      <div className="media-section">
        <Toolbar
          onSearchChange={v => this.onChange('search', v)}
          uploadClickHandler={this.uploadClickHandler}
        />

        {showUploads && (
          <FileUpload
            closeHandler={this.hideUploads}
            setUploadSizes={this.setUploadSizes}
            uploadResponseHandler={this.uploadResponseHandler}
          />
        )}

        <div className="media-container">
          <div className="media">
            {uploadSizes &&
              uploadSizes.length && <Previews sizes={uploadSizes} />}
            <Thumbnails photos={allPhotos} />
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(allPhotosQuery)(MediaViewer);
