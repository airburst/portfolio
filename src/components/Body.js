import React from 'react';
import PropTypes from 'prop-types';

class BodyColor extends React.Component {
  static propTypes = {
    isDark: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
      .isRequired,
  };

  static defaultProps = {
    isDark: false,
  };

  componentDidMount() {
    document.body.classList.toggle('dark', this.props.isDark);
  }

  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('dark', nextProps.isDark);
  }

  componentWillUnmount() {
    document.body.classList.remove('dark');
  }

  render() {
    return this.props.children;
  }
}

export default BodyColor;
