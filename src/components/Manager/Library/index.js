import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import FolderTree from './FolderTree';
import CollectionModal from './CollectionModal';
import Bin from './Bin';
import './Library.css';

class Library extends React.Component {
  static propTypes = {
    albumClickHandler: PropTypes.func.isRequired,
    albumId: PropTypes.number,
  };

  static defaultProps = {
    albumId: null,
  };

  state = { open: false };

  show = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  removeAlbumFilter = e => this.props.albumClickHandler(e, null, null);

  render() {
    const { open } = this.state;
    const { albumClickHandler, albumId } = this.props;

    return (
      <div className="library-section">
        <div className="topbar">Library</div>

        <div className="library-content">
          <div className="collections">
            <FolderTree
              albumClickHandler={albumClickHandler}
              albumId={albumId}
            />
          </div>
        </div>

        <Bin removeAlbumFilter={this.removeAlbumFilter} />

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
