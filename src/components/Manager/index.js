import React, { Component } from 'react';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import './Manager.css';

class Manager extends Component {
  state = {
    selectedPhoto: null,
  };

  thumbnailClickHandler = photo => {
    this.setState({ selectedPhoto: photo });
  };

  clearInspector = () => this.setState({ selectedPhoto: null });

  render() {
    const { selectedPhoto } = this.state;
    const selectedId = selectedPhoto ? selectedPhoto.id : null;

    return (
      <Body isDark>
        <div className="admin-container">
          <Library />
          <MediaViewer
            thumbnailClickHandler={this.thumbnailClickHandler}
            selected={selectedId}
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
