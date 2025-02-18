import React, { useState } from 'react';
import './ProductSearchBar.css';
import search_button from '../../assests/search.png';

const ProductSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [room, setRoom] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = () => {
    onSearch({ location, room, price });
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="filter-type">
          <label>Location</label>
          <input
            type="text"
            placeholder="Mumbai"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="filter-type">
          <label>Room</label>
          <input
            type="number"
            placeholder="2"
            className="search-input"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div className="filter-type">
          <label>Price</label>
          <input
            type="text"
            placeholder="20000₹"
            className="search-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          <img src={search_button} alt="Search" className="search-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductSearchBar;
