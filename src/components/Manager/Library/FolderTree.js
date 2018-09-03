import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Treebeard } from 'react-treebeard';
import albumsQuery from './albumsQuery';
import treeStyles from './FolderTreeStyles';

const albumTree = {
  name: 'ALBUMS',
  toggled: true,
  children: [],
};

const getChildren = (data, cursor) => {
  if (!data) {
    return [];
  }
  const activeChild = cursor && cursor.id;
  const children = [];
  data.forEach(d => {
    const child = { ...d };
    if (activeChild && activeChild === d.id) {
      child.active = true;
    }
    children.push(child);
  });
  return children;
};

const getTree = (data, cursor) => {
  const children = getChildren(data, cursor);
  let { toggled } = albumTree;
  // handle toggle state
  if (cursor && cursor.children) {
    toggled = cursor.toggled;
  }
  return { ...albumTree, toggled, children };
};

class FolderTree extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    albumClickHandler: PropTypes.func.isRequired,
  };

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps.data.allAlbums;
      this.setState({ data });
    }
  }

  onToggle = (node, toggled) => {
    const { cursor } = this.state;
    const newNode = { ...node };

    if (cursor) {
      cursor.active = false;
    }
    newNode.active = true;
    if (node.children) {
      newNode.toggled = toggled;
    } else {
      // Emit album id
      this.props.albumClickHandler(newNode.id);
    }
    this.setState({ cursor: newNode });
  };

  render() {
    const { data, cursor } = this.state;
    const albumTreeData = getTree(data, cursor);

    return (
      <div className="collection-tree">
        <Treebeard
          data={albumTreeData}
          style={treeStyles}
          onToggle={this.onToggle}
        />
      </div>
    );
  }
}

export default graphql(albumsQuery)(FolderTree);
