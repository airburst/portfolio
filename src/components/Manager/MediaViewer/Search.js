import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';

class Search extends React.Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.emitValue = debounce(500, this.emitValue);
  }

  state = {
    text: '',
  };

  handleChange = (e, target) => {
    e.persist();
    const { value } = target;
    this.setState({ text: value });
    this.emitValue(value);
  };

  emitValue(value) {
    this.props.action(value);
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
