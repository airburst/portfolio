import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { albumsQuery } from '../../../../queries';
import TreeHeader from './TreeHeader';
import TreeItem from './TreeItem';
import './FolderTree.css';

class FolderTree extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    albumClickHandler: PropTypes.func.isRequired,
    albumId: PropTypes.number,
  };

  static defaultProps = {
    albumId: null,
  };

  state = {
    data: null,
    open: true,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps.data.allAlbums;
      this.setState({ data });
    }
  }

  toggleHandler = () => this.setState(state => ({ open: !state.open }));

  render() {
    const { albumClickHandler, albumId } = this.props;
    const { data, open } = this.state;

    return (
      <div className="folder-tree">
        <TreeHeader
          title="Albums"
          open={open}
          toggleHandler={this.toggleHandler}
        />
        <ul>
          {data &&
            open &&
            data.map(d => (
              <TreeItem
                key={d.id}
                id={d.id}
                name={d.name}
                clickHandler={albumClickHandler}
                albumId={albumId}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default graphql(albumsQuery)(FolderTree);
