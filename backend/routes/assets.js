const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const assets = {};

// Get all assets (Asset Store)
router.get('/', (req, res) => {
  const assetList = Object.values(assets).map(asset => ({
    ...asset,
    owned: req.headers['x-user-id'] ? asset.ownedBy?.includes(req.headers['x-user-id']) : false
  }));
  res.json(assetList);
});

// Get asset by ID
router.get('/:id', (req, res) => {
  const asset = assets[req.params.id];
  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }
  res.json(asset);
});

// Create asset
router.post('/', (req, res) => {
  try {
    const { name, description, category, price, modelUrl } = req.body;
    const creatorId = req.headers['x-user-id'];

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category required' });
    }

    const assetId = uuidv4();
    assets[assetId] = {
      id: assetId,
      name,
      description: description || '',
      category,
      price: price || 0,
      modelUrl: modelUrl || '',
      thumbnail: 'https://via.placeholder.com/200x200?text=' + encodeURIComponent(name),
      creatorId,
      creatorName: req.headers['x-username'] || 'Unknown',
      downloads: 0,
      rating: 0,
      createdAt: new Date(),
      ownedBy: [],
      reviews: []
    };

    res.status(201).json({ message: 'Asset created', asset: assets[assetId] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download/Purchase asset
router.post('/:id/purchase', (req, res) => {
  const asset = assets[req.params.id];
  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }

  const userId = req.headers['x-user-id'];
  if (!asset.ownedBy.includes(userId)) {
    asset.ownedBy.push(userId);
  }
  asset.downloads++;

  res.json({ message: 'Asset purchased/downloaded', asset });
});

// Rate asset
router.post('/:id/rate', (req, res) => {
  const asset = assets[req.params.id];
  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }

  const { rating } = req.body;
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be 1-5' });
  }

  asset.reviews.push({
    userId: req.headers['x-user-id'],
    rating,
    timestamp: new Date()
  });

  asset.rating = (asset.reviews.reduce((a, b) => a + b.rating, 0) / asset.reviews.length).toFixed(1);
  res.json({ message: 'Asset rated', asset });
});

// Featured assets
router.get('/featured', (req, res) => {
  const featured = Object.values(assets)
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 12);
  res.json(featured);
});

module.exports = router;
