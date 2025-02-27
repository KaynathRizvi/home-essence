require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Import the Product model from the models folder
const Product = require('./models/Product')(sequelize);

// Test the database connection (optional)
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// API endpoint to fetch products from the database using Sequelize
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    // Using a raw SQL query with DISTINCT:
    const [rows] = await pool.query('SELECT DISTINCT product_category FROM products');
    // rows is an array of objects; we extract just the category names
    const categories = rows.map(row => row.product_category);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
