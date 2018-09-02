import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Treebeard } from 'react-treebeard';
import treeStyles from './FolderTreeStyles';

const albumTree = {
  name: 'ALBUMS',
  toggled: true,
  children: [],
};

class FolderTree extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  state = {};

  onToggle = (node, toggled) => {
    const { cursor } = this.state;
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    } else {
      // TODO: Emit node.name to state
      console.log(node.name);
    }
    this.setState({ cursor: node });
  };

  render() {
    const {
      data: { allAlbums },
    } = this.props;
    const children = allAlbums ? allAlbums.data : [];
    const albumTreeData = { ...albumTree, children };

    return (
      <Treebeard
        data={albumTreeData}
        style={treeStyles}
        onToggle={this.onToggle}
      />
    );
  }
}

// List of albums (id, name)
const albumsQuery = gql`
  {
    allAlbums {
      data {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(albumsQuery)(FolderTree);
