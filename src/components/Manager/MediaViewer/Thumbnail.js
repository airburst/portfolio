import React from 'react';
import PropTypes from 'prop-types';
import './MediaViewer.css';

const Picture = ({ src }) => (
  <div className="thumbnail">
    <img src={src} alt="Placeholder" />
  </div>
);

Picture.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Picture;
