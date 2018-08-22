import React, { Component } from 'react';
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
      <div className="admin-container">
        <Library />
        <MediaViewer />
        <Inspector />
      </div>
    );
  }
}

export default Manager;
