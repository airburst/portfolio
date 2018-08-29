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

  render() {
    const { selectedPhoto } = this.state;
    return (
      <Body isDark>
        <div className="admin-container">
          <Library />
          <MediaViewer thumbnailClickHandler={this.thumbnailClickHandler} />
          <Inspector selected={selectedPhoto} />
        </div>
      </Body>
    );
  }
}

export default Manager;
