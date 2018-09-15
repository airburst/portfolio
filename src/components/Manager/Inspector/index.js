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

    return (
      <div className="inspector-section">
        <div className="topbar">Inspector</div>
        <div className="properties-content">
          {album ? (
            <AlbumInspector album={album} />
          ) : (
            <PhotoInspector selected={selected} />
          )}
        </div>
      </div>
    );
  }
}

export default Inspector;
