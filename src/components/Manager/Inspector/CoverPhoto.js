import React from 'react';
import PropTypes from 'prop-types';
import './Inspector.css';

class CoverPhoto extends React.Component {
  static propTypes = {
    onDropCoverPhoto: PropTypes.func.isRequired,
    cover: PropTypes.string,
  };

  static defaultProps = {
    cover: null,
  };

  state = {
    hovering: false,
  };

  onDrop = e => {
    const photos = e.dataTransfer.getData('photos');
    const photoIds = photos.split(',').map(p => parseInt(p, 10));
    this.setState({ hovering: false });
    this.props.onDropCoverPhoto(photoIds[0]);
  };

  onDragEnter = () => this.setState({ hovering: true });

  onDragOver = e => e.preventDefault();

  onDragLeave = () => this.setState({ hovering: false });

  render() {
    const { hovering } = this.state;
    const { cover } = this.props;
    const coverClass = `cover-photo${hovering ? ' droppable' : ''}`;
    const coverStyle = {
      backgroundImage: `url(${cover})`,
      backgroundPosition: 'center',
      backgroundSize: '50%',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <React.Fragment>
        <div
          className={coverClass}
          style={coverStyle}
          droppable="true"
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        />
      </React.Fragment>
    );
  }
}

export default CoverPhoto;
