import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import FolderTree from './FolderTree';
import CollectionModal from './CollectionModal';
import './Library.css';

class Library extends React.Component {
  state = { open: false };

  show = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <div className="library-section">
        <div className="topbar">Library</div>
        <div className="library-content">
          <div className="collections">
            <FolderTree />
          </div>
        </div>
        <div className="library-action-buttons">
          <Button
            secondary
            icon
            size="mini"
            className="delete-photo-button"
            onClick={this.show}
          >
            <Icon name="plus" />
          </Button>
        </div>

        <CollectionModal open={open} closeHandler={this.close} />
      </div>
    );
  }
}

export default Library;
