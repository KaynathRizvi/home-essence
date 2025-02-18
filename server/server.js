const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('../shared/products');  // Import shared product data

const app = express();
app.use(cors());
app.use(express.json());

// Serve static images from the 'shared/images' folder
app.use('/images', express.static(path.join(__dirname, '../shared/images')));

// Define API route to get product data
app.get('/api/products', (req, res) => {
  res.json(products);  // Send products as response
});

app.listen(8081, () => {
  console.log("Backend running on http://localhost:8081");
});
