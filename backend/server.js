const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// In-memory database (replace with MongoDB in production)
const db = {
  users: [],
  games: [],
  assets: [],
  purchases: [],
  friends: [],
  comments: []
};

// Simulated user database
const users = new Map();
const games = new Map();
const assets = new Map();

// Routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const userRoutes = require('./routes/users');
const assetRoutes = require('./routes/assets');
const economyRoutes = require('./routes/economy');
const socialRoutes = require('./routes/social');

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/economy', economyRoutes);
app.use('/api/social', socialRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'BitByteLabs Server is running!', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 BitByteLabs Gaming Platform running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});

module.exports = { app, db, users, games, assets };
