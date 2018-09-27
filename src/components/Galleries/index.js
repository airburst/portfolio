import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Masonry from 'react-masonry-component';
import Card from './Card';
import { publicAlbumsQuery, addViewMutation } from '../../queries';
import './Galleries.css';

const masonryOptions = {
  itemSelector: '.gallery',
  gutter: 20,
  columnWidth: 376,
  isOriginLeft: true,
  transitionDuration: 0.4,
};

// eslint-disable-next-line react/prefer-stateless-function
class GalleriesView extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  };

  clickHandler = (e, id) => {
    this.props.mutate({
      variables: { albumId: id },
      refetchQueries: [{ query: publicAlbumsQuery }],
    });
    this.props.history.push(`/gallery/${id}`);
  };

  render() {
    const {
      // loading,
      // error,
      data: { getPublicAlbums },
    } = this.props;
    // TODO: Display loader while true
    // Display something else on error
    const Cards = getPublicAlbums
      ? getPublicAlbums.data.map(a => (
          <Card
            key={`card-${a.id}`}
            id={a.id}
            name={a.name}
            views={a.views}
            cover={a.cover}
            clickHandler={this.clickHandler}
          />
        ))
      : [<div key="card-null" />];

    return (
      <div className="galleries-container">
        <div className="gallery-cards">
          <Masonry
            className="my-gallery-class"
            options={masonryOptions}
            // style={style}
          >
            {Cards}
          </Masonry>
        </div>
      </div>
    );
  }
}

// Apply filter for selected album
export default compose(
  graphql(publicAlbumsQuery),
  graphql(addViewMutation)
)(GalleriesView);
