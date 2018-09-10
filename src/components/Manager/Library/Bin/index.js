import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Icon, Label, Menu } from 'semantic-ui-react';
import allBinItemsQuery from '../../../../queries/allBinItemsQuery';
import './Bin.css';

class Bin extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  state = {
    showMenu: false,
    hovering: false,
  };

  onDrop = e => {
    const photos = e.dataTransfer.getData('photos');
    const album = e.dataTransfer.getData('album');
    if (album) {
      // TODO: mutation
      this.setState(state => ({
        albums: [...state.albums, parseInt(album, 10)],
      }));
    }
    if (photos) {
      // TODO: mutation
      const photoIds = photos.split(',').map(p => parseInt(p, 10));
      this.setState(state => ({ photos: [...state.photos, ...photoIds] }));
    }
    // this.props
    //   .mutate({
    //     variables: { albumId: id, photoIds },
    //   })
    //   .then(({ data }) => {
    //     if (data.addPhotosToAlbum && !data.addPhotosToAlbum.errors) {
    //       this.setState({ hovering: false });
    //     } else {
    //       // TODO: bubble error
    //       console.log('TreeItem error', data.addPhotosToAlbum.errors);
    //     }
    //   })
    //   .catch(err => console.log('Error adding photos to album', err.message));
  };

  // onDragEnter = () => this.setState({ hovering: true });

  // onDragOver = e => e.preventDefault();

  // onDragLeave = () => this.setState({ hovering: false });

  binClickHandler = () => {
    const {
      data: { allBinItems },
    } = this.props;
    const photos = (allBinItems && allBinItems.photos) || [];
    const albums = (allBinItems && allBinItems.albums) || [];
    if (photos.length > 0 || albums.length > 0) {
      this.setState(state => ({ showMenu: !state.showMenu }));
    }
  };

  emptyHandler = () => console.log('bin -> empty');

  restoreHandler = () => console.log('bin -> restore');

  overlayClickHandler = () => this.setState({ showMenu: false });

  render() {
    const {
      data: { allBinItems },
    } = this.props;
    const photos = (allBinItems && allBinItems.photos) || [];
    const albums = (allBinItems && allBinItems.albums) || [];
    const { showMenu } = this.state;
    const count = photos.length + albums.length;
    const hasContent = count > 0;
    const binClass = `bin-container${hasContent ? ' not-empty' : ''}`;

    return (
      <React.Fragment>
        <div
          className={binClass}
          droppable="true"
          // onDragEnter={this.onDragEnter}
          // onDragOver={this.onDragOver}
          // onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onClick={this.binClickHandler}
        >
          <div className="icon">
            <Icon name="trash alternate" size="large" />
          </div>
          <div className="bin-text">Bin</div>
          {hasContent && (
            <div className="bin-label">
              <Label circular size="mini" color="grey">
                {count}
              </Label>
            </div>
          )}
        </div>

        {showMenu && (
          <div className="bin-overlay" onClick={this.overlayClickHandler}>
            <div className="bin-menu">
              <Menu inverted pointing vertical>
                <Menu.Item name="Restore" onClick={this.restoreHandler} />
                <Menu.Item name="Empty Bin" onClick={this.emptyHandler} />
              </Menu>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default graphql(allBinItemsQuery, {
  options: props => ({ fetchPolicy: 'network-only' }),
})(Bin);
