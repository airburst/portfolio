import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import { allPhotosQuery, albumsQuery } from '../../queries';
import './Manager.css';

// TODO: handle Mac command keypress
// Firefox: 224
// Opera: 17
// WebKit browsers (Safari/Chrome): 91 (Left Command) or 93 (Right Command)
// https://github.com/MichaelZelensky/jsLibraries/blob/master/macKeys.js

// Manage array of selected thumbnails, including Ctrl and Shift clicks
const getSelectionState = (state, e) => {
  const id = parseInt(e.target.id, 10);
  // If state already contains entry, remove it. Else add it
  const index = state.indexOf(id);
  if (index > -1) {
    const newState = [...state];
    newState.splice(index, 1);
    return newState;
  }
  if (e.ctrlKey) {
    return [...state, id];
  }
  // if (e.shiftKey) {
  //   const last = state[state.length - 1];
  //   // NOTE: Only works in id sort order
  //   const idRange = [];
  //   for (let i = id; i < last; i++) {
  //     idRange.push(i);
  //   }
  //   return [...state, ...idRange];
  // }
  return [id];
};

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

  thumbnailClickHandler = e => {
    const { selectedPhotos } = this.state;
    const newSelection = getSelectionState(selectedPhotos, e);
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
