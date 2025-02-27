import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import ProductSearchBar from './components/ProductSearchBar/ProductSearchBar';
import ProductCatalog from './components/ProductCatalog/ProductCatalog';
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://home-essence-server.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={
              <div>
                <Home />
                <ProductList products={filteredProducts} />
              </div>
            } 
          />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
