import React from 'react';
// import PropTypes from 'prop-types';
import { Icon, Label, Menu } from 'semantic-ui-react';
import './Bin.css';

class Bin extends React.Component {
  // static propTypes = {
  //   albumClickHandler: PropTypes.func.isRequired,
  //   albumId: PropTypes.number,
  // };

  // static defaultProps = {
  //   photos: null,
  //   albums: null,
  // };

  state = {
    photos: [],
    albums: [],
    showMenu: false,
    hovering: false,
  };

  onDrop = e => {
    const photos = e.dataTransfer.getData('photos');
    const album = e.dataTransfer.getData('album');
    if (album) {
      // console.log('TCL: Bin -> albums', {
      //   albums: [...this.state.albums, album],
      // });
      this.setState(state => ({
        albums: [...state.albums, parseInt(album, 10)],
      }));
    }
    if (photos) {
      const photoIds = photos.split(',').map(p => parseInt(p, 10));
      // console.log('TCL: Bin -> photos', {
      //   photos: [...this.state.photos, ...photoIds],
      // });
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

  onDragEnter = () => this.setState({ hovering: true });

  onDragOver = e => e.preventDefault();

  onDragLeave = () => this.setState({ hovering: false });

  binClickHandler = () => {
    if (this.state.photos.length > 0 || this.state.albums.length > 0) {
      this.setState(state => ({ showMenu: !state.showMenu }));
    }
  };

  emptyHandler = () => this.setState({ photos: [], albums: [] });

  restoreHandler = () => console.log('bin -> restore');

  overlayClickHandler = () => this.setState({ showMenu: false });

  render() {
    const { photos, albums, showMenu } = this.state;
    const count = photos.length + albums.length;
    const hasContent = count > 0;
    const binClass = `bin-container${hasContent ? ' not-empty' : ''}`;

    return (
      <React.Fragment>
        <div
          className={binClass}
          droppable="true"
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
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

export default Bin;
