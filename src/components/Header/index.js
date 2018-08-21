import React, { Component } from 'react';
import './Header.css';

const Header = props => {
  return (
    <div className="header">
      <ul className="nav">
        <li className="logo">Fairhurst Photos</li>
        <li className="photos">
          <a className="menu-item" href="#" title="View photo galleries">View Site</a>
        </li>
        <li className="login">
          <a className="menu-item" href="#" title="Sign in to manage site">Mark</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
