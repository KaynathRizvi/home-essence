import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsToShow = 3;

  useEffect(() => {
    fetch('http://localhost:8081/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="product-container">
      <div
        className="product-listing"
        style={{
          transform: `translateX(-${currentIndex * (100 / productsToShow)}%)`,
          transition: 'transform 0.9s ease-in-out'
        }}
      >
        {products.slice(currentIndex, currentIndex + productsToShow).map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://localhost:8081${product.image}`}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">Price: ₹{product.price}</p>
            <div className="product-button">
              <Link to={`/product/${product.id}`}>
                <button className="see-more-button">See More</button>
              </Link>
              <button className="cart-button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="img-slide">
        <button
          className="slide-button"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          ❮
        </button>
        <button
          className="slide-button"
          onClick={nextSlide}
          disabled={currentIndex >= products.length - productsToShow}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ProductList;
