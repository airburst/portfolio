import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import { allPhotosQuery, albumsQuery } from '../../queries';
import { selectionState } from './selectionState';
import 'semantic-ui-css/semantic.min.css';
import './Manager.css';

class Manager extends Component {
  static propTypes = {
    albumsData: PropTypes.object.isRequired,
    photosData: PropTypes.object.isRequired,
  };

  state = {
    selectedPhotos: [],
    albumId: null,
    albumName: null,
  };

  thumbnailClickHandler = photoSet => (e, keyCode) => {
    const { selectedPhotos, albumId } = this.state;
    const newSelection = selectionState(
      e,
      keyCode,
      selectedPhotos,
      photoSet,
      albumId
    ); // Pass sort order and filter
    this.setState({ selectedPhotos: newSelection });
  };

  deselectPhotos = () => {
    this.setState({ selectedPhotos: [] });
  };

  thumbnailDragStart = e => {
    e.dataTransfer.setData('photos', this.state.selectedPhotos);
  };

  albumClickHandler = (e, albumId, albumName) => {
    this.setState({
      albumId,
      albumName,
      selectedPhotos: [],
    });
  };

  removeFilterHandler = () => {
    this.setState({ albumId: null, albumName: null });
  };

  clearInspector = () => this.setState({ selectedPhotos: [] });

  render() {
    const { selectedPhotos, albumId, albumName } = this.state;
    const { photosData, albumsData } = this.props;
    const { allPhotos } = photosData;
    const { allAlbums } = albumsData;

    // Find photos and album details by id
    const photos =
      allPhotos && allPhotos.data
        ? Object.values(allPhotos.data).filter(c =>
            selectedPhotos.includes(c.id)
          )
        : [];
    const album =
      allAlbums && allAlbums.data
        ? Object.values(allAlbums.data).filter(a => albumId === a.id)[0]
        : null;

    const photo = photos.length ? photos[0] : null;

    return (
      <Body isDark>
        <div className="admin-container">
          <Library
            albumClickHandler={this.albumClickHandler}
            deselectPhotos={this.deselectPhotos}
            albumId={albumId}
          />
          <MediaViewer
            thumbnailClickHandler={this.thumbnailClickHandler}
            thumbnailDragHandler={this.thumbnailDragStart}
            removeFilterHandler={this.removeFilterHandler}
            selected={selectedPhotos}
            albumId={albumId}
            albumName={albumName}
          />
          <Inspector
            selected={photo}
            album={album}
            clearInspector={this.clearInspector}
          />
        </div>
      </Body>
    );
  }
}

export default compose(
  graphql(albumsQuery, { name: 'albumsData' }),
  graphql(allPhotosQuery, { name: 'photosData' })
)(Manager);
