import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { publicAlbumsQuery } from '../../queries';
import './Galleries.css';

const GalleryCard = props => {
  const { id, name, description, cover } = props;

  return (
    <div className="gallery" onClick={() => console.log(id)}>
      <div className="gallery__item">
        <img className="thumbnail" src={cover} alt={`View ${name} gallery`} />
        <div className="gallery__title">
          {name}
          {description && <div className="">{description}</div>}
        </div>
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.number,
  cover: PropTypes.string,
};

GalleryCard.defaultProps = {
  description: null,
  cover: null,
};

export default graphql(publicAlbumsQuery)(GalleryCard);
