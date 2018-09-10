import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import Thumbnails, { Previews } from './Thumbnails';
import allPhotosQuery from '../../../queries/allPhotosQuery';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    thumbnailClickHandler: PropTypes.func.isRequired,
    thumbnailDragHandler: PropTypes.func.isRequired,
    removeFilterHandler: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    albumId: PropTypes.number,
    albumName: PropTypes.string,
  };

  static defaultProps = {
    albumId: null,
    albumName: null,
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
      selected,
      thumbnailClickHandler,
      thumbnailDragHandler,
      removeFilterHandler,
      albumName,
    } = this.props;
    const { showUploads, uploadSizes } = this.state;

    return (
      <div className="media-section">
        <Toolbar
          onSearchChange={v => this.onChange('search', v)}
          uploadClickHandler={this.uploadClickHandler}
          filter={albumName}
          removeFilterHandler={removeFilterHandler}
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
            <Thumbnails
              photos={allPhotos}
              selected={selected}
              clickHandler={thumbnailClickHandler}
              dragHandler={thumbnailDragHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Apply filter for selected album
export default graphql(allPhotosQuery, {
  options: props => {
    const variables = props.albumId ? { albumId: props.albumId } : {};
    return {
      variables,
      // fetchPolicy: 'network-only',
    };
  },
})(MediaViewer);
