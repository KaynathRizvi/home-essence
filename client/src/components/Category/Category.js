import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css'; // You can adjust or add additional styles here

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, [API_URL]);

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    if(selectedCategory) {
      navigate(`/catalog?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <div className="category-container">
        <h1 className='category-title'>Filter by Category</h1>
      <select className="category-dropdown" onChange={handleChange} defaultValue="">
        <option value="" disabled>Select a category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
