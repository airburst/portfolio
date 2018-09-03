import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './MediaViewer.css';

const Thumbnail = ({ id, src, preview, selected, clickHandler }) => {
  const thumbClass = `thumbnail${preview ? ' preview' : ''}${
    selected ? ' selected' : ''
  }`;
  return (
    <div
      className={thumbClass}
      onClick={clickHandler}
      onKeyPress={clickHandler}
    >
      {!preview && <img id={id} src={src} alt="Placeholder" />}
    </div>
  );
};

Thumbnail.propTypes = {
  id: PropTypes.number.isRequired,
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
      id={p.id}
      src={p.thumbnail}
      selected={selected.includes(p.id)}
      clickHandler={clickHandler}
    />
  ));
};

Thumbnails.propTypes = {
  photos: PropTypes.object,
  clickHandler: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

Thumbnails.defaultProps = {
  photos: null,
};

export default Thumbnails;
