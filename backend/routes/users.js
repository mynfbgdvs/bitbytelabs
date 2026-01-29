const express = require('express');
const router = express.Router();

const users = {};

// Get user profile
router.get('/:id', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Update user profile
router.put('/:id', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { bio, avatar, displayName } = req.body;

  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;
  if (displayName !== undefined) user.displayName = displayName;

  res.json({ message: 'Profile updated', user });
});

// Get user's games
router.get('/:id/games', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user.ownedGames || []);
});

// Get user's friends
router.get('/:id/friends', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user.friendsList || []);
});

// Add friend
router.post('/:id/friends/:friendId', (req, res) => {
  const user = users[req.params.id];
  const friend = users[req.params.friendId];

  if (!user || !friend) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.friendsList.includes(req.params.friendId)) {
    user.friendsList.push(req.params.friendId);
  }

  res.json({ message: 'Friend added', friendsList: user.friendsList });
});

// Remove friend
router.delete('/:id/friends/:friendId', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.friendsList = user.friendsList.filter(f => f !== req.params.friendId);
  res.json({ message: 'Friend removed', friendsList: user.friendsList });
});

// Get user leaderboard
router.get('/leaderboard', (req, res) => {
  const leaderboard = Object.values(users)
    .sort((a, b) => b.robux - a.robux)
    .slice(0, 50)
    .map((u, i) => ({
      rank: i + 1,
      username: u.username,
      robux: u.robux,
      level: u.level,
      experience: u.experience
    }));

  res.json(leaderboard);
});

module.exports = router;
