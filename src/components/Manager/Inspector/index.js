import React from 'react';
import PropTypes from 'prop-types';
import PhotoInspector from './PhotoInspector';
import './Inspector.css';

class Inspector extends React.Component {
  static propTypes = {
    selected: PropTypes.object,
  };

  static defaultProps = {
    selected: null,
  };

  render() {
    const { selected } = this.props;

    return (
      <div className="inspector-section">
        <div className="topbar">Inspector</div>
        <div className="properties-content">
          <PhotoInspector selected={selected} />
        </div>
      </div>
    );
  }
}

export default Inspector;
