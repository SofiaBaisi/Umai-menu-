// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="container-navbar">
      <nav className="navbar container">
        <i className="fa-solid fa-bars"></i>
        <ul className="menu">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
