const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./products'); // Load products from the file

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
