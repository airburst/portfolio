import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './MediaViewer.css';

const Thumbnail = ({ src, preview, selected, clickHandler }) => {
  const thumbClass = `thumbnail${preview ? ' preview' : ''}${
    selected ? ' selected' : ''
  }`;
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
  selected: PropTypes.bool,
};

Thumbnail.defaultProps = {
  preview: false,
  selected: false,
};

export const Previews = ({ sizes }) =>
  sizes.map((k, i) => (
    <div className="thumbnail preview" key={i}>
      <Loader active inverted inline />
    </div>
  ));

const Thumbnails = ({ photos, selected, clickHandler }) => {
  if (!photos || !photos.data || !photos.data.length) {
    return <div />;
  }
  const { data } = photos;

  return data.map(p => (
    <Thumbnail
      key={p.id}
      src={p.thumbnail}
      selected={selected && selected === p.id}
      clickHandler={() => clickHandler(p)}
    />
  ));
};

Thumbnails.propTypes = {
  photos: PropTypes.object,
  clickHandler: PropTypes.func.isRequired,
  selected: PropTypes.number,
};

Thumbnails.defaultProps = {
  photos: null,
  selected: null,
};

export default Thumbnails;
