import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  handleChange = (e, target) => {
    e.preventDefault();
    const { value } = target;
    this.setState({ text: value }, () =>
      this.deBounce(() => this.props.action(value), 300)()
    );
  };

  // TODO: debounce not really working
  deBounce(func, wait, immediate) {
    let timeout;
    return () => {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  }

  render() {
    const { text } = this.state;

    return (
      <div className="search-container">
        <Input
          className="search-input-new"
          icon="search"
          placeholder="Search..."
          size="mini"
          onChange={this.handleChange}
          value={text}
        />
      </div>
    );
  }
}

export default Search;
