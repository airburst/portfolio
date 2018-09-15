import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import './Manager.css';

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
    client: PropTypes.object.isRequired,
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
    // IE: e.dataTransfer.setData(“text/plain”,id)

    // Works:
    // const img = new Image();
    // img.src = 'http://localhost:3001/photos/2018/9/2/alps-027-150w.jpg';
    // e.dataTransfer.setDragImage(img, 75, 50);

    //   componentDidMount() {
    //     const img = new Image();
    //     img.src = 'https://some-image.png';
    //     img.onload = () => this.setState({ dragImg: img });
    //  }
    //  drag(e) {
    //     e.dataTransfer.setDragImage(this.state.dragImg, 0, 0);
    //  }

    // const crt = this.cloneNode(true);
    // crt.style.backgroundColor = 'red';
    // crt.style.position = 'absolute';
    // crt.style.top = '0px';
    // crt.style.right = '0px';
    // document.body.appendChild(crt);
    // e.dataTransfer.setDragImage(crt, 0, 0);
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
    const { client } = this.props;

    // Find photos and album details by id from cache
    const cache = client.cache.data.data;
    const photos = Object.values(cache).filter(
      c => c.__typename === 'Photo' && selectedPhotos.includes(c.id)
    );
    const album = Object.values(cache).filter(
      a => a.__typename === 'Album' && albumId === a.id
    )[0];

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

export default withApollo(Manager);
