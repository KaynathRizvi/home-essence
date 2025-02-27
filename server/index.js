require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
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
const User = require('./models/User')(sequelize);

// Test the database connection (optional)
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/signup', async (req, res) => {
  try {
    const { user_name, user_email, user_contact, user_pass } = req.body;

    const existingUser = await User.findOne({ where: { user_email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before storing
    const hashedPassword = user_pass; // If you're not using bcrypt, directly save the password

    await User.create({
      user_name,
      user_email,
      user_contact,
      user_pass: hashedPassword
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// ✅ Login API
app.post('/api/login', async (req, res) => {
  try {
    const { user_email, user_pass } = req.body;

    const user = await User.findOne({ where: { user_email } });
    if (!user || user.user_pass !== user_pass) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ user_id: user.user_id, user_name: user.user_name }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token, user_name: user.user_name });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// ✅ Logout API
app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

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

// API endpoint to fetch distinct categories using Sequelize
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('product_category')), 'product_category']
      ],
      raw: true,
    });
    // Map the result to an array of category names
    const categoryList = categories.map(cat => cat.product_category);
    res.json(categoryList);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
