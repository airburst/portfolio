import React from 'react';
import PropTypes from 'prop-types';
import PhotoInspector from './PhotoInspector';
import AlbumInspector from './AlbumInspector';
import './Inspector.css';

const Inspector = props => {
  const { selected, album } = props;
  const displayAlbum = !!album && !!album.id;

  return (
    <div className="inspector-section">
      <div className="topbar">Inspector</div>
      <div className="properties-content">
        <AlbumInspector album={album} />
        {!displayAlbum && <PhotoInspector selected={selected} />}
      </div>
    </div>
  );
};

Inspector.propTypes = {
  selected: PropTypes.object,
  album: PropTypes.object,
};

Inspector.defaultProps = {
  selected: null,
  album: null,
};

export default Inspector;
