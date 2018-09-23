import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './MediaViewer.css';

const UploadPreview = ({ name, uploading, thumbnail }) => (
  <div className="thumbnail preview">
    {name}
    {uploading && <Loader active inverted inline />}
    {thumbnail && <img src={thumbnail} alt={name} />}
  </div>
);

UploadPreview.propTypes = {
  name: PropTypes.string.isRequired,
  uploading: PropTypes.bool.isRequired,
  thumbnail: PropTypes.string,
};

UploadPreview.defaultProps = {
  thumbnail: null,
};

const UploadPreviews = ({ uploads }) =>
  uploads &&
  uploads.length &&
  uploads.map(u => (
    <UploadPreview
      key={`upload-${u.name}`}
      name={u.name}
      uploading={u.uploading}
    />
  ));

export default UploadPreviews;
