import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Header.css';

const Header = ({ user, cartItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload(); // Refresh the page to update the header
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <h1 className='navbar-title'>Home Essence</h1>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/catalog" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/cartpage" onClick={closeMenu}>Cart</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>

        {user ? (
          <li className='profile-container'>
            <Link to="/favorites" className='profile-name'>Welcome, {user}!</Link>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
