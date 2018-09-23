import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import './HeaderDark.css';

const Header = () => (
  <div className="page-header">
    <ul className="nav">
      <li className="logo">
        <Link className="logo-item" to="/" title="home">
          Fairhurst Photos
        </Link>
      </li>
      <li className="photos">
        <Link className="menu-item" to="/gallery" title="Test gallery">
          Test Gallery
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

export default Header;
