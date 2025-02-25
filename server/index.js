require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0
});

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// API endpoint to fetch products from the database
app.get('/api/products', async (req, res) => {
  try {
    // Adjust the table name if necessary (here it's assumed to be "Products")
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
