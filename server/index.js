require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

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

    res.json({ message: 'Login successful', token, user_name: user.user_name, user_id: user.user_id });
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

// ===================== FAVORITES ENDPOINTS =====================
//
const Favorites = require('./models/Favorites')(sequelize, DataTypes);
const Cart = require('./models/Cart')(sequelize, DataTypes);

// POST /api/favorites - Add a favorite item
app.post('/api/favorites', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    // Check if the favorite already exists for this user and product
    const existingFavorite = await Favorites.findOne({ where: { user_id, product_id } });
    if (existingFavorite) {
      return res.status(400).json({ error: 'Product already favorited' });
    }
    const favorite = await Favorites.create({ user_id, product_id });
    res.status(201).json({ message: 'Favorite added', favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// GET /api/favorites - Get all favorite items for a user
// Pass the user_id as a query parameter, e.g., /api/favorites?user_id=1
app.get('/api/favorites', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const favorites = await Favorites.findAll({ where: { user_id } });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// DELETE /api/favorites/:id - Remove a favorite item by its ID
app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Favorites.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Favorite removed' });
    } else {
      res.status(404).json({ error: 'Favorite not found' });
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

//
// ===================== CART ENDPOINTS =====================
//

// POST /api/cart - Add an item to the cart
// Request body should include: { user_id, product_id, quantity }
app.post('/api/cart', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    // Check if the item is already in the cart for the user
    const existingItem = await Cart.findOne({ where: { user_id, product_id } });
    if (existingItem) {
      // If it exists, update the quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: 'Cart updated', cartItem: existingItem });
    } else {
      // Otherwise, create a new cart item
      const cartItem = await Cart.create({ user_id, product_id, quantity });
      res.status(201).json({ message: 'Item added to cart', cartItem });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// GET /api/cart - Get all cart items for a user
// Pass the user_id as a query parameter, e.g., /api/cart?user_id=1
app.get('/api/cart', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const cartItems = await Cart.findAll({ where: { user_id } });
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// DELETE /api/cart/:id - Remove an item from the cart by its ID
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
