import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductCatalog.css';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

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

  const filteredProducts = products.filter(product =>
    product.product_title.toLowerCase().includes(searchQuery)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='catalog-container'>
      <ProductSearchBar />
      <div className='catalog-listing'   style={{justifyContent: filteredProducts.length < 3 ? 'center' : 'space-between'}}>
        {filteredProducts.map(product => (
          <div className="catalog-card" key={product['product_id']}>
            <img src={product.product_image} alt={product.product_title} className="catalog-image" />
            <h3 className='catalog-title'>{product.product_title}</h3>
            <p className="catalog-detail">{product.product_detail}</p>
            <p className='catalog-price'>Price: ₹{product.product_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
