import React from 'react';
import PropTypes from 'prop-types';
import PhotoInspector from './PhotoInspector';
import AlbumInspector from './AlbumInspector';
import './Inspector.css';

class Inspector extends React.Component {
  static propTypes = {
    selected: PropTypes.object,
    album: PropTypes.object,
  };

  static defaultProps = {
    selected: null,
    album: null,
  };

  state = { height: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () =>
    this.setState({ height: window.innerHeight - 50 });

  render() {
    const { selected, album } = this.props;
    const displayAlbum = !!album && !!album.id;
    const styles = { height: this.state.height };

    return (
      <div className="inspector-section" style={styles}>
        <div className="topbar">Inspector</div>
        <div className="properties-content">
          <AlbumInspector album={album} />
          {!displayAlbum && <PhotoInspector selected={selected} />}
        </div>
      </div>
    );
  }
}

export default Inspector;
