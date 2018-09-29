import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import './HeaderDark.css';

const Header = () => (
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
