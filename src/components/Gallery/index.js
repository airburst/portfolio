import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { graphql } from 'react-apollo';
import { publicPhotosQuery } from '../../queries';
import photoSet, { lightboxSet } from './photoSet';
import './Gallery.css';

const lightboxTheme = {
  container: {
    background: 'rgba(0, 0, 0, 0.95)',
    gutter: {
      horizontal: 1,
      vertical: 1,
    },
  },
};

class GalleryView extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState(state => ({ currentImage: state.currentImage - 1 }));
  }

  gotoNext() {
    this.setState(state => ({ currentImage: state.currentImage + 1 }));
  }

  render() {
    const {
      // loading,
      // error,
      data: { allPhotos },
    } = this.props;
    // TODO: Display loader while true
    // Display something else on error
    const photos = photoSet(allPhotos);
    const lightboxPhotos = lightboxSet(allPhotos);

    return (
      <div className="gallery-container">
        {allPhotos && (
          <div className="gallery-photos">
            <Gallery photos={photos} onClick={this.openLightbox} columns={2} />
            <Lightbox
              images={lightboxPhotos}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              backdropClosesModal
              width={2560}
              theme={lightboxTheme}
            />
          </div>
        )}
      </div>
    );
  }
}

// Apply filter for selected album
export default graphql(publicPhotosQuery, {
  options: props => ({
    variables: { albumId: parseInt(props.match.params.id, 10) },
  }),
})(GalleryView);
