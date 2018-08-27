import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import Thumbnails from './Thumbnails';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  state = {
    // search: '', // TODO: use search
    showUploads: false,
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  uploadClickHandler = () => {
    this.setState({ showUploads: true });
  };

  handleUploadResponse = ({ data }) => {
    const { uploadPhotos } = data;
    if (uploadPhotos && uploadPhotos.length) {
      console.log(uploadPhotos.filter(u => u.success).map(p => p.thumbnail));
    }
  };

  render() {
    const {
      data: { allPhotos }, // loading
    } = this.props;
    const { showUploads } = this.state;

    console.log(allPhotos);

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
            <Thumbnails photos={allPhotos} />
          </div>
        </div>
      </div>
    );
  }
}

const allPhotosQuery = gql`
  {
    allPhotos {
      data {
        id
        urls
        thumbnail
        title
        caption
        width
        height
        exposure
        shutter
        aperture
        iso
        focalLength
        dateTaken
        isPublic
        createdAt
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(allPhotosQuery)(MediaViewer);
