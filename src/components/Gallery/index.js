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
  footerCaption: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  },
};

class GalleryView extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    error: PropTypes.object,
  };

  static defaultProps = {
    error: null,
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
      error,
      data: { publicPhotos },
    } = this.props;
    const photos = photoSet(publicPhotos);
    const lightboxPhotos = lightboxSet(publicPhotos);

    return (
      <div className="gallery-container">
        {/* {loading && <div>Loading...</div>} */}
        {error && <div>Oops.. There appears to be a problem</div>}
        {publicPhotos && (
          <div className="gallery-photos">
            <Gallery
              photos={photos}
              onClick={this.openLightbox}
              columns={2}
              direction="row"
            />
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
    variables: { albumId: props.match.params.id },
  }),
})(GalleryView);
