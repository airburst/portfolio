import React from 'react';
import PropTypes from 'prop-types';
import './Library.css';

class Tree extends React.Component {
  state = {
    hovering: false,
  };

  onDrop = (e, id) => {
    const photos = e.dataTransfer.getData('photos');
    console.log('dropped', id, photos);
  };

  onDragEnter = e => {
    this.setState({ hovering: true });
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragLeave = e => {
    this.setState({ hovering: false });
  };

  render() {
    const { data } = this.props;
    const { hovering } = this.state;
    const treeClass = `collection-item${hovering ? ' droppable' : ''}`;

    return data ? (
      <ul>
        {data.map(d => (
          <li
            key={d.id}
            id={d.id}
            className={treeClass}
            droppable="true"
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={e => this.onDrop(e, d.id)}
          >
            {d.name}
          </li>
        ))}
      </ul>
    ) : (
      <div />
    );
  }
}

export default Tree;
