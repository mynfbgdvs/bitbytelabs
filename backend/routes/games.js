const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const games = {};

// Get all games
router.get('/', (req, res) => {
  const gameList = Object.values(games).map(game => ({
    ...game,
    rating: (game.ratings?.reduce((a, b) => a + b, 0) / (game.ratings?.length || 1) || 0).toFixed(1)
  }));
  res.json(gameList);
});

// Get featured games
router.get('/featured', (req, res) => {
  const featured = Object.values(games)
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 8);
  res.json(featured);
});

// Get game by ID
router.get('/:id', (req, res) => {
  const game = games[req.params.id];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(game);
});

// Create new game
router.post('/', (req, res) => {
  try {
    const { title, description, category, isPublic } = req.body;
    const userId = req.headers['x-user-id'];

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    const gameId = uuidv4();
    games[gameId] = {
      id: gameId,
      title,
      description,
      category: category || 'Other',
      creatorId: userId,
      creatorName: req.headers['x-username'] || 'Unknown',
      isPublic: isPublic !== false,
      thumbnail: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(title),
      plays: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'development',
      price: 0,
      ratings: [],
      comments: [],
      assets: []
    };

    res.status(201).json({ message: 'Game created', game: games[gameId] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update game
router.put('/:id', (req, res) => {
  try {
    const game = games[req.params.id];
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const { title, description, category, isPublic, status, price } = req.body;
    
    if (title) game.title = title;
    if (description) game.description = description;
    if (category) game.category = category;
    if (isPublic !== undefined) game.isPublic = isPublic;
    if (status) game.status = status;
    if (price !== undefined) game.price = price;
    
    game.updatedAt = new Date();

    res.json({ message: 'Game updated', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete game
router.delete('/:id', (req, res) => {
  if (!games[req.params.id]) {
    return res.status(404).json({ error: 'Game not found' });
  }
  delete games[req.params.id];
  res.json({ message: 'Game deleted' });
});

// Play game (increment counter)
router.post('/:id/play', (req, res) => {
  const game = games[req.params.id];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  game.plays++;
  res.json({ message: 'Game play recorded', plays: game.plays });
});

// Like game
router.post('/:id/like', (req, res) => {
  const game = games[req.params.id];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  game.likes++;
  res.json({ message: 'Game liked', likes: game.likes });
});

// Rate game
router.post('/:id/rate', (req, res) => {
  const game = games[req.params.id];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  const { rating } = req.body;
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be 1-5' });
  }
  game.ratings.push(rating);
  const avgRating = (game.ratings.reduce((a, b) => a + b) / game.ratings.length).toFixed(1);
  res.json({ message: 'Rating submitted', averageRating: avgRating });
});

// Search games
router.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const category = req.query.category;

  let results = Object.values(games).filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.description.toLowerCase().includes(query)
  );

  if (category) {
    results = results.filter(g => g.category === category);
  }

  res.json(results);
});

module.exports = router;
