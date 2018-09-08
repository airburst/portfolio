import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './FolderTree.css';

const TreeHeader = props => {
  const { title, open, toggleHandler } = props;

  return (
    <div className="folder-heading" onClick={toggleHandler}>
      {open && <Icon name="triangle down" />}
      {!open && <Icon name="triangle up" />}
      {title}
    </div>
  );
};

TreeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  // clickHandler: PropTypes.func.isRequired,
};

export default TreeHeader;
