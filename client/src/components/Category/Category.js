import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched category data:", data);
        // Check if data is an array; if not, set to an empty array or handle accordingly.
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, [API_URL]);

  const handleCategoryClick = (category) => {
    // Navigate to the catalog page with the selected category as a query parameter
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="category-container">
      <h2>Categories</h2>
      <ul className="category-list">
        {categories.map((cat, index) => (
          <li key={index} className="category-item" onClick={() => handleCategoryClick(cat)}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
