// Header.js
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <h1>User's Bars</h1>
      <button onClick={toggleNav} className="nav-toggle-button">
        ☰
      </button>
      <nav className={`nav-bar ${isNavOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">All Your Bars</a></li>
          <li><a href="#services">Account Info</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
