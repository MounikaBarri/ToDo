import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h2>To-Do App</h2>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/todo">To-Do</Link>
      </nav>
    </header>
  );
};

export default Header;
