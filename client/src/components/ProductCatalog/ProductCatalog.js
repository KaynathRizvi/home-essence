import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductCatalog.css';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';
import Category from '../Category/Category';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';
  const categoryQuery = queryParams.get('category')?.toLowerCase() || '';

  useEffect(() => {
    fetch('https://home-essence-server.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_title.toLowerCase().includes(searchQuery);
    const matchesCategory = product.product_category.toLowerCase().includes(categoryQuery);
    return matchesSearch && matchesCategory;
  });

  const handleAddFavorite = async (product) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert("Please login to add favorites.");
      return;
    }
    try {
      const response = await fetch('https://home-essence-server.onrender.com/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(localStorage.getItem('user_id')),
          product_id: product.product_id
        })
      });
      if (response.ok) {
        alert('Product added to favorites!');
      } else {
        alert('Error faced in adding favorite.');
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Error adding favorite.");
    }
  };

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }
  
    fetch('https://home-essence-server.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: parseInt(localStorage.getItem('user_id')),
        product_id: product.product_id,
        quantity: 1
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert('Product added to cart successfully!');
      }
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
      alert('Error adding item to cart.');
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='catalog-container'>
      <div className='catalog-search-bar'><ProductSearchBar /></div>
      <Category />
      <div className='catalog-listing' style={{justifyContent: filteredProducts.length < 3 ? 'center' : 'space-between'}}>
        {filteredProducts.map(product => (
          <div className="catalog-card" key={product.product_id}>
            <img src={product.product_image} alt={product.product_title} className="catalog-image" />
            <h3 className='catalog-title'>{product.product_title}</h3>
            <p className="catalog-detail">{product.product_detail}</p>
            <p className='catalog-price'>Price: ₹{product.product_price}</p>
            <div className="catalog-button">
              <button className="catalog-fav-button" onClick={() => handleAddFavorite(product)}>Wishlist</button>
              <button className="catalog-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
