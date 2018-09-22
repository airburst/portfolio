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
    deselectPhotos: PropTypes.func.isRequired,
    albumId: PropTypes.number,
  };

  static defaultProps = {
    albumId: null,
  };

  state = {
    open: false,
    height: 0,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  show = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  removeAlbumFilter = e => this.props.albumClickHandler(e, null, null);

  updateWindowDimensions = () =>
    this.setState({ height: window.innerHeight - 50 });

  render() {
    const { open } = this.state;
    const { albumClickHandler, albumId, deselectPhotos } = this.props;
    const styles = { height: this.state.height };

    return (
      <div className="library-section" style={styles}>
        <div className="topbar">Library</div>

        <div className="library-content">
          <div className="collections">
            <FolderTree
              albumClickHandler={albumClickHandler}
              albumId={albumId}
            />
          </div>
        </div>

        <Bin
          albumId={albumId}
          removeAlbumFilter={this.removeAlbumFilter}
          removePhotos={deselectPhotos}
        />

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
