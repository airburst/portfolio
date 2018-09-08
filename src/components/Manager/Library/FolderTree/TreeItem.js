import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import addPhotosToAlbumMutation from '../addPhotosToAlbumMutation';
import './FolderTree.css';

class Tree extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
  };

  state = {
    hovering: false,
  };

  onDrop = (e, id) => {
    const photos = e.dataTransfer.getData('photos');
    const photoIds = photos.split(',').map(p => parseInt(p, 10));
    this.props
      .mutate({ variables: { albumId: id, photoIds } })
      .then(({ data }) => {
        if (data.addPhotosToAlbum && !data.addPhotosToAlbum.errors) {
          this.setState({ hovering: false });
        } else {
          // TODO: bubble error
          console.log('TreeItem error', data.addPhotosToAlbum.errors);
        }
      })
      .catch(err => console.log('Error adding photos to album', err.message));
  };

  onDragEnter = () => {
    this.setState({ hovering: true });
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragLeave = () => {
    this.setState({ hovering: false });
  };

  render() {
    const { id, name, clickHandler } = this.props;
    const { hovering } = this.state;
    const treeClass = `folder-item${hovering ? ' droppable' : ''}`;

    return (
      <li
        id={id}
        className={treeClass}
        droppable="true"
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={e => this.onDrop(e, id)}
        onClick={e => clickHandler(e, id)}
      >
        {name}
      </li>
    );
  }
}

export default graphql(addPhotosToAlbumMutation)(Tree);
