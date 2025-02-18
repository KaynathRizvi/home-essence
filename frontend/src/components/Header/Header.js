import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Header.css';

const Header = ({ cartItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h1>Urban Rental</h1>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li>
          <Link to="/">Home</Link> {/* Use 'to' instead of 'href' */}
        </li>
        <li>
          <Link to="/about">About Us</Link> {/* Updated link */}
        </li>
        <li>
          <Link to="/products">Products</Link> {/* Updated link */}
        </li>
        <li>
          <Link to="/cart">Cart ({cartItems.length})</Link> {/* Updated link */}
        </li>
        <li>
          <Link to="/login">Login</Link> {/* Updated link */}
        </li>
        <li>
          <Link to="/contact">Contact</Link> {/* Updated link */}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
