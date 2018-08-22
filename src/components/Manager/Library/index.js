import React from 'react';
import FolderTree from './FolderTree';

class Library extends React.Component {
  render() {
    return (
      <div>
        <div className="topbar">Library</div>
        <div className="content">
          <FolderTree />
        </div>
      </div>
    );
  }
};

export default Library;
