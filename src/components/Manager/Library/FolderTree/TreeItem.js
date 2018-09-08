import React from 'react';
import PropTypes from 'prop-types';
import './FolderTree.css';

class Tree extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
  };

  state = {
    hovering: false,
  };

  onDrop = (e, id) => {
    const photos = e.dataTransfer.getData('photos');
    console.log('dropped', id, photos);
    this.setState({ hovering: false });
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

export default Tree;
