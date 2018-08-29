import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './MediaViewer.css';

const Thumbnail = ({ src, preview, clickHandler }) => {
  const thumbClass = `thumbnail${preview ? ' preview' : ''}`;
  return (
    <div
      className={thumbClass}
      onClick={clickHandler}
      onKeyPress={clickHandler}
    >
      {!preview && <img src={src} alt="Placeholder" />}
    </div>
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  preview: PropTypes.bool,
};

Thumbnail.defaultProps = {
  preview: false,
};

export const Previews = ({ sizes }) =>
  sizes.map((k, i) => (
    <div className="thumbnail preview" key={i}>
      <Loader active inverted inline />
    </div>
  ));

const Thumbnails = ({ photos, clickHandler }) => {
  if (!photos || !photos.data || !photos.data.length) {
    return <div />;
  }
  const { data } = photos;
  return data.map(p => (
    <Thumbnail
      key={p.id}
      src={p.thumbnail}
      clickHandler={() => clickHandler(p)}
    />
  ));
};

export default Thumbnails;
