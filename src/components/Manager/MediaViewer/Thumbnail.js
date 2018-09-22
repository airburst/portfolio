import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import './MediaViewer.css';

const Count = ({ count }) => (
  <Label circular floating color="orange" className="thumbnail-drag-count">
    {count}
  </Label>
);

Count.propTypes = {
  count: PropTypes.number.isRequired,
};

class Thumbnail extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    dragHandler: PropTypes.func.isRequired,
    preview: PropTypes.bool,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    preview: false,
    selected: false,
  };

  state = {
    keyCode: null,
  };

  componentWillMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    // this.unsubscribe = this.subscribe(this.props.id);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  keyDownHandler = e => {
    this.setState({ keyCode: e.keyCode });
  };

  keyUpHandler = e => {
    this.setState({ keyCode: null });
  };

  clickHandler = e => this.props.clickHandler(e, this.state.keyCode);

  render() {
    const { id, src, preview, selected, dragHandler } = this.props;
    const thumbClass = `thumbnail${preview ? ' preview' : ''}${
      selected ? ' selected' : ''
    }`;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={thumbClass}
        onClick={this.clickHandler}
        onDragStart={dragHandler}
      >
        {!preview && (
          <img draggable={selected} id={id} src={src} alt="Placeholder" />
        )}
        {/* <Count count={2} /> */}
      </div>
    );
  }
}

export default Thumbnail;
