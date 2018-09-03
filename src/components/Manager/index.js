import React, { Component } from 'react';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import './Manager.css';

class Manager extends Component {
  state = {
    selectedPhoto: null,
    selectedAlbum: null,
  };

  thumbnailClickHandler = photo => {
    this.setState({ selectedPhoto: photo });
  };

  albumClickHandler = albumId => {
    this.setState({ selectedAlbum: albumId });
  };

  clearInspector = () => this.setState({ selectedPhoto: null });

  render() {
    const { selectedPhoto, selectedAlbum } = this.state;
    const selectedId = selectedPhoto ? selectedPhoto.id : null;

    return (
      <Body isDark>
        <div className="admin-container">
          <Library albumClickHandler={this.albumClickHandler} />
          <MediaViewer
            thumbnailClickHandler={this.thumbnailClickHandler}
            selected={selectedId}
            selectedAlbum={selectedAlbum}
          />
          <Inspector
            selected={selectedPhoto}
            clearInspector={this.clearInspector}
          />
        </div>
      </Body>
    );
  }
}

export default Manager;
