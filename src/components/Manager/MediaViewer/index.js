import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import Thumbnails from './Thumbnails';
import UploadPreviews from './UploadPreviews';
import { allPhotosQuery } from '../../../queries';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    thumbnailClickHandler: PropTypes.func.isRequired,
    thumbnailDragHandler: PropTypes.func.isRequired,
    removeFilterHandler: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    // albumId: PropTypes.number,
    albumName: PropTypes.string,
  };

  static defaultProps = {
    // albumId: null,
    albumName: null,
  };

  state = {
    showUploads: false,
    uploads: [],
    height: 0,
    // search: '', // TODO: use search
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () =>
    this.setState({ height: window.innerHeight - 50 });

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  uploadClickHandler = () => {
    this.setState({ showUploads: true });
  };

  uploadResponseHandler = ({ data }) => {
    const { uploadPhoto } = data;
    const { name, success, error, thumbnail } = uploadPhoto;
    if (!success) {
      // Handle error
      console.log('FAIL: upload', error);
      return false;
    }
    this.setUploading({ name, thumbnail, uploading: false });
  };

  hideUploads = () => this.setState({ showUploads: false });

  setUploads = (files, cb) => {
    const uploads = files.map(f => ({
      name: f.name,
      uploading: false,
      thumbnail: null,
    }));
    this.setState({ uploads }, () => {
      if (cb) {
        cb();
      }
    });
  };

  setUploading = upload => {
    const index = this.state.uploads.findIndex(u => u.name === upload.name);
    const uploadState = [...this.state.uploads];
    uploadState.splice(index, 1);
    if (upload.thumbnail) {
      // Remove item from state if done
      this.setState({ uploads: uploadState });
    } else {
      this.setState({ uploads: [...uploadState, upload] });
    }
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
    const { showUploads, uploads } = this.state;
    const photos = allPhotos ? allPhotos.data : [];
    const styles = { height: this.state.height };

    return (
      <div className="media-section" style={styles}>
        <Toolbar
          onSearchChange={v => this.onChange('search', v)}
          uploadClickHandler={this.uploadClickHandler}
          filter={albumName}
          removeFilterHandler={removeFilterHandler}
        />
        {showUploads && (
          <FileUpload
            closeHandler={this.hideUploads}
            setUploads={this.setUploads}
            setUploading={this.setUploading}
            uploadResponseHandler={this.uploadResponseHandler}
          />
        )}
        <div className="media-container">
          <div className="media">
            {uploads.length > 0 && <UploadPreviews uploads={uploads} />}
            <Thumbnails
              photos={photos}
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
      fetchPolicy: 'network-only',
    };
  },
})(MediaViewer);
