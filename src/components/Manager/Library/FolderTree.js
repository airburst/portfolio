import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import albumsQuery from './albumsQuery';
import TreeItem from './TreeItem';
import './Library.css';

class FolderTree extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    // albumClickHandler: PropTypes.func.isRequired,
  };

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps.data.allAlbums;
      this.setState({ data });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div className="collection-tree">
        <ul>
          {data &&
            data.map(d => <TreeItem key={d.id} id={d.id} name={d.name} />)}
        </ul>
      </div>
    );
  }
}

export default graphql(albumsQuery)(FolderTree);
