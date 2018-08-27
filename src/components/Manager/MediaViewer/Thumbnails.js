import React from 'react';
import PropTypes from 'prop-types';
import './MediaViewer.css';

const Thumbnail = ({ src }) => (
  <div className="thumbnail">
    <img src={src} alt="Placeholder" />
  </div>
);

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
};

const Thumbnails = ({ photos }) => {
  if (!photos || !photos.data || !photos.data.length) {
    return <div />;
  }
  const { data } = photos;
  return data.map(p => <Thumbnail key={p.id} src={p.thumbnail} />);
};

export default Thumbnails;
