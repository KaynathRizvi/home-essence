import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import ProductSearchBar from './components/ProductSearchBar/ProductSearchBar';
import Footer from './components/Footer/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = (searchCriteria) => {
    const { location, room, price } = searchCriteria;

    const results = products.filter((property) => {
      const matchesLocation =
        location === '' || property.location.toLowerCase().includes(location.toLowerCase());
      const matchesRoom = room === '' || property.room === parseInt(room);
      const matchesPrice = price === '' || property.price <= parseInt(price);

      return matchesLocation && matchesRoom && matchesPrice;
    });

    setFilteredProducts(results);
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home />
                <ProductSearchBar onSearch={handleSearch} />
                <ProductList products={filteredProducts} />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
