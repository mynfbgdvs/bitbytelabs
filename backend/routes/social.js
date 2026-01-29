const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const posts = {};
const messages = {};

// Create post
router.post('/posts', (req, res) => {
  try {
    const { userId, content, imageUrl } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content required' });
    }

    const postId = uuidv4();
    posts[postId] = {
      id: postId,
      userId,
      username: req.headers['x-username'] || 'Unknown',
      content,
      imageUrl: imageUrl || null,
      likes: 0,
      comments: [],
      shares: 0,
      createdAt: new Date(),
      likedBy: []
    };

    res.status(201).json({ message: 'Post created', post: posts[postId] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get feed
router.get('/feed', (req, res) => {
  const feed = Object.values(posts)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 50);

  res.json(feed);
});

// Get user's posts
router.get('/user/:userId/posts', (req, res) => {
  const userPosts = Object.values(posts)
    .filter(p => p.userId === req.params.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(userPosts);
});

// Like post
router.post('/posts/:postId/like', (req, res) => {
  const post = posts[req.params.postId];
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const userId = req.headers['x-user-id'];
  if (!post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
    post.likes++;
  }

  res.json({ message: 'Post liked', likes: post.likes });
});

// Comment on post
router.post('/posts/:postId/comment', (req, res) => {
  const post = posts[req.params.postId];
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: 'Comment required' });
  }

  post.comments.push({
    id: uuidv4(),
    userId: req.headers['x-user-id'],
    username: req.headers['x-username'] || 'Unknown',
    text: comment,
    createdAt: new Date(),
    likes: 0
  });

  res.status(201).json({ message: 'Comment added', commentsCount: post.comments.length });
});

// Send message
router.post('/messages/send', (req, res) => {
  try {
    const { fromUserId, toUserId, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Message content required' });
    }

    const messageId = uuidv4();
    messages[messageId] = {
      id: messageId,
      fromUserId,
      toUserId,
      content,
      createdAt: new Date(),
      read: false
    };

    res.status(201).json({ message: 'Message sent', messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages (conversation)
router.get('/messages/:userId', (req, res) => {
  const userId = req.params.userId;
  const conversation = Object.values(messages)
    .filter(m => m.fromUserId === userId || m.toUserId === userId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  res.json(conversation);
});

// Mark message as read
router.put('/messages/:messageId/read', (req, res) => {
  const message = messages[req.params.messageId];
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  message.read = true;
  res.json({ message: 'Message marked as read' });
});

module.exports = router;
