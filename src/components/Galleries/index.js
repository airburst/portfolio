import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Card from './Card';
import { publicAlbumsQuery } from '../../queries';
import './Galleries.css';

// eslint-disable-next-line react/prefer-stateless-function
class GalleriesView extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  clickHandler = (e, id) => this.props.history.push(`/gallery/${id}`);

  render() {
    const {
      // loading,
      // error,
      data: { allAlbums },
    } = this.props;
    // TODO: Display loader while true
    // Display something else on error
    const Cards = allAlbums ? (
      allAlbums.data.map(a => (
        <Card
          key={`card-${a.id}`}
          id={a.id}
          name={a.name}
          description={a.description}
          cover={a.cover}
          clickHandler={this.clickHandler}
        />
      ))
    ) : (
      <div />
    );

    return (
      <div className="galleries-container">
        <div className="gallery-cards">{Cards}</div>
      </div>
    );
  }
}

// Apply filter for selected album
export default graphql(publicAlbumsQuery)(GalleriesView);
