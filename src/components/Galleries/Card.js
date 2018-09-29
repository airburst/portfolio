import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { publicAlbumsQuery } from '../../queries';
import './Galleries.css';

const GalleryCard = props => {
  const { id, name, slug, cover, views, clickHandler } = props;

  return (
    <div className="gallery" onClick={e => clickHandler(e, id, slug)}>
      <div className="gallery-item">
        <img
          className="gallery-cover"
          src={cover}
          alt={`View ${name} gallery`}
        />
        <div className="gallery-title">
          {name}
          {views > 0 && (
            <div className="gallery-views">
              <FontAwesomeIcon icon={faEye} className="gallery-icon" />
              {views}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string,
  views: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  cover: PropTypes.string,
};

GalleryCard.defaultProps = {
  cover: null,
  slug: null,
};

export default graphql(publicAlbumsQuery)(GalleryCard);
