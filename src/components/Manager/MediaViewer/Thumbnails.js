import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './MediaViewer.css';

const Thumbnail = ({ src, preview }) => {
  const thumbClass = `thumbnail${preview ? ' preview' : ''}`;
  return (
    <div className={thumbClass}>
      {!preview && <img src={src} alt="Placeholder" />}
    </div>
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  preview: PropTypes.bool,
};

Thumbnail.defaultProps = {
  preview: false,
};

const Thumbnails = ({ photos }) => {
  if (!photos || !photos.data || !photos.data.length) {
    return <div />;
  }
  const { data } = photos;
  return data.map(p => <Thumbnail key={p.id} src={p.thumbnail} />);
};

export const Previews = ({ photos }) =>
  photos.map(url => (
    <div className="thumbnail preview" key={url}>
      <Loader active inverted inline>
        {/* <Icon name="image outline" size="huge" /> */}
      </Loader>
    </div>
  ));

// export const Previews = ({ photos }) =>
//   photos.map(url => <Thumbnail preview key={url} src={url} />);

export default Thumbnails;
