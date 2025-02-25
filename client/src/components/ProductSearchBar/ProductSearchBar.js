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
          <label>Search for Products</label>
          <input
            type="text"
            placeholder="Eg: Table"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
