import React from 'react';
import PropTypes from 'prop-types';
import PhotoInspector from './PhotoInspector';
import AlbumInspector from './AlbumInspector';
import './Inspector.css';

class Inspector extends React.Component {
  static propTypes = {
    selected: PropTypes.object,
    albumId: PropTypes.number,
  };

  static defaultProps = {
    selected: null,
    albumId: null,
  };

  render() {
    const { selected, albumId } = this.props;

    return (
      <div className="inspector-section">
        <div className="topbar">Inspector</div>
        <div className="properties-content">
          {albumId ? (
            <AlbumInspector albumId={albumId} />
          ) : (
            <PhotoInspector selected={selected} />
          )}
        </div>
      </div>
    );
  }
}

export default Inspector;
