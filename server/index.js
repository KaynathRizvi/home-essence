const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./products'); // Load products from the file

const app = express();
app.use(cors());
app.use(express.json());

// Serve images from the server
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve products via API
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
