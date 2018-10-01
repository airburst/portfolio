import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';
import './HeaderDark.css';

const Header = ({ auth }) => (
  <div className="page-header">
    <ul className="nav">
      <li className="logo">
        <Link to="/" title="home">
          <span className="logo-item">F</span>
          <span className="tagline">airhursts</span>
        </Link>
      </li>
      <li className="photos">
        <Link
          className="menu-item"
          to="/galleries"
          title="View photo galleries"
        >
          Photos
        </Link>
      </li>
      <li className="login">
        {!auth && (
          <Link
            className="menu-item"
            to="/login"
            title="Sign in to manage site"
          >
            Sign in
          </Link>
        )}
        {auth && (
          <Link
            className="menu-item"
            to="/manager"
            title="Sign in to manage site"
          >
            Manager
          </Link>
        )}
      </li>
    </ul>
  </div>
);

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default Header;
