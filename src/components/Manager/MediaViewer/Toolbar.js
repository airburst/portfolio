import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Search from './Search';

// TODO: Add sort by dropdown
const Toolbar = ({ onSearchChange, uploadClickHandler }) => (
  <div>
    <div className="topbar">
      <div className="left">
        <Button
          secondary
          size="mini"
          onClick={uploadClickHandler}
          content="Upload"
        />
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
};

export default Toolbar;
