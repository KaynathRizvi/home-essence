import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import ProductSearchBar from './components/ProductSearchBar/ProductSearchBar';
import Footer from './components/Footer/Footer';
import products from './products';

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartItems, setCartItems] = useState([]);

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

  const addToCart = (property) => {
    setCartItems((prevItems) => [...prevItems, property]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
                {/* You can use PropertyList here to display filteredProperties */}
                <ProductList />
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
