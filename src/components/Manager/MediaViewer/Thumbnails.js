import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Label } from 'semantic-ui-react';
import './MediaViewer.css';

const Count = ({ count }) => (
  <Label circular floating color="orange" className="thumbnail-drag-count">
    {count}
  </Label>
);

Count.propTypes = {
  count: PropTypes.number.isRequired,
};

const Thumbnail = ({
  id,
  src,
  preview,
  selected,
  clickHandler,
  dragHandler,
}) => {
  const thumbClass = `thumbnail${preview ? ' preview' : ''}${
    selected ? ' selected' : ''
  }`;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={thumbClass}
      onClick={clickHandler}
      onKeyPress={clickHandler}
      onDragStart={dragHandler}
    >
      {!preview && (
        <img draggable={selected} id={id} src={src} alt="Placeholder" />
      )}
      {/* <Count count={2} /> */}
    </div>
  );
};

Thumbnail.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  dragHandler: PropTypes.func.isRequired,
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

const Thumbnails = ({ photos, selected, clickHandler, dragHandler }) => {
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
      dragHandler={dragHandler}
    />
  ));
};

Thumbnails.propTypes = {
  photos: PropTypes.object,
  clickHandler: PropTypes.func.isRequired,
  dragHandler: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

Thumbnails.defaultProps = {
  photos: null,
};

export default Thumbnails;
