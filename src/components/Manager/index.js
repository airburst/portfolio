import React, { Component } from 'react';
import Body from '../Body';
import Library from './Library';
import MediaViewer from './MediaViewer';
import Inspector from './Inspector';
import './Manager.css';

class Manager extends Component {
  state = {
    // selectedPhoto: null,
  };

  render() {
    return (
      <Body isDark>
        <div className="admin-container">
          <Library />
          <MediaViewer />
          <Inspector />
        </div>
      </Body>
    );
  }
}

export default Manager;
