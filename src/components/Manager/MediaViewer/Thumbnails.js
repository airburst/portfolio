import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import './MediaViewer.css';

const Thumbnails = ({ photos, selected, clickHandler, dragHandler }) => {
  const photoSet = photos.map(d => d.id);

  return photos.map(p => (
    <Thumbnail
      key={p.id}
      id={p.id}
      src={p.thumbnail}
      selected={selected.includes(p.id)}
      clickHandler={clickHandler(photoSet)}
      dragHandler={dragHandler}
    />
  ));
};

Thumbnails.propTypes = {
  photos: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
  dragHandler: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default Thumbnails;
