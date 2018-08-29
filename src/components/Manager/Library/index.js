import React from 'react';
import FolderTree from './FolderTree';
import './Library.css';

const Library = () => (
  <div className="library-section">
    <div className="topbar">Library</div>
    <div className="library-content">
      <FolderTree />
    </div>
  </div>
);

export default Library;
