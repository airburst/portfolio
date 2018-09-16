import React from 'react';
import PropTypes from 'prop-types';
import PhotoInspector from './PhotoInspector';
import AlbumInspector from './AlbumInspector';
import './Inspector.css';

class Inspector extends React.Component {
  static propTypes = {
    selected: PropTypes.object,
    album: PropTypes.object,
  };

  static defaultProps = {
    selected: null,
    album: null,
  };

  render() {
    const { selected, album } = this.props;
    const displayAlbum = !!album && !!album.id;

    return (
      <div className="inspector-section">
        <div className="topbar">Inspector</div>
        <div className="properties-content">
          <AlbumInspector album={album} />}
          {!displayAlbum && <PhotoInspector selected={selected} />}
        </div>
      </div>
    );
  }
}

export default Inspector;
