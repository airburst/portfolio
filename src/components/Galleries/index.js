import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Masonry from 'react-masonry-component';
import Card from './Card';
import { publicAlbumsQuery, addViewMutation } from '../../queries';
import ServerContext from '../../ServerContext';
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

  clickHandler = (e, id, slug) => {
    this.props.mutate({
      variables: { albumId: id },
      refetchQueries: [{ query: publicAlbumsQuery }],
    });
    const path = slug && slug.length > 0 ? slug : id;
    this.props.history.push(`/gallery/${path}`);
  };

  render() {
    const {
      // loading,
      // error,
      data: { getPublicAlbums },
    } = this.props;
    // TODO: Display loader while true
    // Display something else on error
    const Cards = ({ serverUrl }) =>
      getPublicAlbums
        ? getPublicAlbums.data.map(a => (
            <Card
              key={`card-${a.id}`}
              id={a.id}
              name={a.name}
              slug={a.slug}
              views={a.views}
              cover={a.cover}
              clickHandler={this.clickHandler}
              serverUrl={serverUrl}
            />
          ))
        : [<div key="card-null" />];

    return (
      <ServerContext.Consumer>
        {serverUrl => (
          <div className="galleries-container">
            <div className="gallery-cards">
              <Masonry
                className="my-gallery-class"
                options={masonryOptions}
                // style={style}
              >
                <Cards serverUrl={serverUrl} />
              </Masonry>
            </div>
          </div>
        )}
      </ServerContext.Consumer>
    );
  }
}

// Apply filter for selected album
export default compose(
  graphql(publicAlbumsQuery),
  graphql(addViewMutation)
)(GalleriesView);
