import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import './Manager.css';

const getSelectionState = (state, e) => {
  const id = parseInt(e.target.id, 10);
  if (e.ctrlKey) {
    // If state already contains entry, remove it. Else add it
    const index = state.indexOf(id);
    if (index > -1) {
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    }
    return [...state, id];
  }
  if (e.shiftKey) {
    const last = state[state.length - 1];
    // NOTE: Only works in id sort order
    const idRange = [];
    for (let i = id; i < last; i++) {
      idRange.push(i);
    }
    return [...state, ...idRange];
  }
  return [id];
};

class Manager extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
  };

  state = {
    selectedPhotos: [],
    selectedAlbum: null,
  };

  thumbnailClickHandler = e => {
    const { selectedPhotos } = this.state;
    const newSelection = getSelectionState(selectedPhotos, e);
    this.setState({ selectedPhotos: newSelection });
  };

  thumbnailDragStart = e => {
    console.log('dragstart', this.state.selectedPhotos);
    e.dataTransfer.setData('photos', this.state.selectedPhotos);
    // IE: e.dataTransfer.setData(“text/plain”,id)
  };

  onDragOver = (e, albumId) => {
    e.preventDefault();
    console.log('TCL: Manager -> onDragOver -> albumId', albumId);
  };

  onDrop = (e, cat) => {
    const photos = e.dataTransfer.getData('photos');
    // IE e.dataTransfer.getData('text');

    // this.setState({ ...this.state, tasks });
  };

  albumClickHandler = albumId => {
    this.setState({ selectedAlbum: albumId });
  };

  clearInspector = () => this.setState({ selectedPhotos: [] });

  render() {
    const { selectedPhotos, selectedAlbum } = this.state;
    const { client } = this.props;

    // Find photos by id from cache
    const cache = client.cache.data.data;
    const photos = Object.values(cache).filter(
      c => c.__typename === 'Photo' && selectedPhotos.includes(c.id)
    );

    const photo = photos.length ? photos[0] : null;

    return (
      <Body isDark>
        <div className="admin-container">
          <Library albumClickHandler={this.albumClickHandler} />
          <MediaViewer
            thumbnailClickHandler={this.thumbnailClickHandler}
            thumbnailDragHandler={this.thumbnailDragStart}
            selected={selectedPhotos}
            selectedAlbum={selectedAlbum}
          />
          <Inspector selected={photo} clearInspector={this.clearInspector} />
        </div>
      </Body>
    );
  }
}

export default withApollo(Manager);
