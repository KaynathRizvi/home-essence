const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('../products'); // Adjust path if needed

const app = express();
app.use(cors());
app.use(express.json());

// Serve images
app.use('/images', express.static(path.join(__dirname, '../images')));

// API route for products
app.get('/api/products', (req, res) => {
  res.json(products);
});

module.exports = app;
