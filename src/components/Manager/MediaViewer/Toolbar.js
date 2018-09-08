import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label, Icon } from 'semantic-ui-react';
import Search from './Search';

// TODO: Add sort by dropdown
const Toolbar = ({
  onSearchChange,
  uploadClickHandler,
  filter,
  removeFilterHandler,
}) => (
  <div>
    <div className="topbar">
      <div className="left">
        <Button
          secondary
          size="mini"
          onClick={uploadClickHandler}
          content="Upload"
        />
        {filter && (
          <Label color="grey">
            {filter}
            <Icon name="delete" onClick={removeFilterHandler} />
          </Label>
        )}
      </div>
      <div className="right">
        <Search action={onSearchChange} />
      </div>
    </div>
  </div>
);

Toolbar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  uploadClickHandler: PropTypes.func.isRequired,
  removeFilterHandler: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

Toolbar.defaultProps = {
  filter: null,
};

export default Toolbar;
