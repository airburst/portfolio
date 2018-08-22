import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';
import './HeaderDark.css';

const Header = ({ isDark }) => {
  const headerClass = `header ${isDark ? 'dark' : ''}`;

  return (
    <div className={headerClass}>
      <ul className="nav">
        <li className="logo">
          <Link className="logo-item" to="/" title="home">
            Fairhurst Photos
          </Link>
        </li>
        <li className="photos">
          <Link className="menu-item" to="/" title="View photo galleries">
            View Site
          </Link>
        </li>
        <li className="login">
          <Link
            className="menu-item"
            to="/manager"
            title="Sign in to manage site"
          >
            Mark
          </Link>
        </li>
      </ul>
    </div>
  );
};

Header.propTypes = {
  isDark: PropTypes.bool,
};

Header.defaultProps = {
  isDark: false,
};

export default Header;
