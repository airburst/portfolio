import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Icon, Label, Menu } from 'semantic-ui-react';
import {
  allBinItemsQuery,
  addToBinMutation,
  restoreMutation,
  emptyBinMutation,
  allPhotosQuery,
  albumsQuery,
} from '../../../../queries';
import './Bin.css';

const refetchQueries = [
  { query: allPhotosQuery },
  { query: allBinItemsQuery },
  { query: albumsQuery },
];

class Bin extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
    removeAlbumFilter: PropTypes.func.isRequired,
  };

  state = {
    showMenu: false,
    hovering: false,
  };

  addToBin = (type, ids) =>
    this.props.mutate({
      mutation: addToBinMutation,
      variables: { type, ids },
      refetchQueries,
    });

  restore = () =>
    this.props.mutate({
      mutation: restoreMutation,
      refetchQueries,
    });

  emptyBin = () =>
    this.props.mutate({
      mutation: emptyBinMutation,
      refetchQueries,
    });

  onDrop = e => {
    const photos = e.dataTransfer.getData('photos');
    const album = e.dataTransfer.getData('album');
    if (album) {
      this.addToBin('album', [parseInt(album, 10)]);
      this.props.removeAlbumFilter();
    }
    if (photos) {
      const photoIds = photos.split(',').map(p => parseInt(p, 10));
      this.addToBin('photo', photoIds);
    }
  };

  onDragEnter = () => this.setState({ hovering: true });

  onDragOver = e => e.preventDefault();

  onDragLeave = () => this.setState({ hovering: false });

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
                <Menu.Item name="Restore" onClick={this.restore} />
                <Menu.Item name="Empty Bin" onClick={this.emptyBin} />
              </Menu>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(allBinItemsQuery, {
    options: props => ({ fetchPolicy: 'network-only' }),
  }),
  graphql(addToBinMutation)
)(Bin);
