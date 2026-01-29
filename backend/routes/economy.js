const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const users = {};
const transactions = {};

// Get user balance
router.get('/balance/:userId', (req, res) => {
  const user = users[req.params.userId];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    userId: req.params.userId,
    robux: user.robux || 0,
    lastUpdated: new Date()
  });
});

// Purchase Robux (In-app purchases)
router.post('/robux/purchase', (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;
    const user = users[userId];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (amount < 10 || amount > 100000) {
      return res.status(400).json({ error: 'Invalid Robux amount' });
    }

    const transactionId = uuidv4();
    transactions[transactionId] = {
      id: transactionId,
      userId,
      type: 'purchase',
      amount,
      paymentMethod,
      timestamp: new Date(),
      status: 'completed'
    };

    user.robux = (user.robux || 0) + amount;

    res.status(201).json({
      message: 'Robux purchased successfully',
      transactionId,
      newBalance: user.robux
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer Robux between users
router.post('/robux/transfer', (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;
    const fromUser = users[fromUserId];
    const toUser = users[toUserId];

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (fromUser.robux < amount) {
      return res.status(400).json({ error: 'Insufficient Robux' });
    }

    fromUser.robux -= amount;
    toUser.robux = (toUser.robux || 0) + amount;

    const transactionId = uuidv4();
    transactions[transactionId] = {
      id: transactionId,
      fromUserId,
      toUserId,
      amount,
      type: 'transfer',
      timestamp: new Date(),
      status: 'completed'
    };

    res.json({
      message: 'Robux transferred successfully',
      transactionId,
      fromBalance: fromUser.robux,
      toBalance: toUser.robux
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Game monetization (earn Robux from game)
router.post('/earnings/add', (req, res) => {
  try {
    const { gameId, userId, amount } = req.body;
    const user = users[userId];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.robux = (user.robux || 0) + amount;
    user.experience = (user.experience || 0) + (amount / 10);

    if (user.experience >= user.level * 100) {
      user.level = Math.floor(user.experience / 100) + 1;
    }

    const transactionId = uuidv4();
    transactions[transactionId] = {
      id: transactionId,
      userId,
      gameId,
      type: 'earning',
      amount,
      timestamp: new Date()
    };

    res.json({
      message: 'Earnings added',
      transactionId,
      newBalance: user.robux,
      newLevel: user.level,
      newExperience: user.experience
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction history
router.get('/transactions/:userId', (req, res) => {
  const userTransactions = Object.values(transactions)
    .filter(t => t.userId === req.params.userId || t.fromUserId === req.params.userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 50);

  res.json(userTransactions);
});

// Marketplace listings
router.post('/marketplace/list', (req, res) => {
  try {
    const { userId, itemId, itemType, price } = req.body;

    const listing = {
      id: uuidv4(),
      sellerId: userId,
      itemId,
      itemType,
      price,
      createdAt: new Date(),
      sold: false
    };

    res.status(201).json({ message: 'Item listed', listing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
