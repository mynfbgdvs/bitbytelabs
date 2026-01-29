// API functions

const API_BASE = 'http://localhost:5000/api';

// Health check
async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE.replace('/api', '')}/api/health`);
    const data = await response.json();
    console.log('Server Status:', data);
    return data.status === 'BitByteLabs Server is running!';
  } catch (error) {
    console.error('Server check failed:', error);
    return false;
  }
}

// User Registration
async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}

// User Login
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Verify Token
async function verifyToken(token) {
  try {
    const response = await fetch(`${API_BASE}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    return data.valid ? data.user : null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Create Game
async function createGame(title, description, category, isPublic) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`,
        'x-user-id': appState.currentUser.id,
        'x-username': appState.currentUser.username
      },
      body: JSON.stringify({ title, description, category, isPublic })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.game;
  } catch (error) {
    throw error;
  }
}

// Update Game
async function updateGame(gameId, updates) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/games/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.game;
  } catch (error) {
    throw error;
  }
}

// Delete Game
async function deleteGame(gameId) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/games/${gameId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${appState.token}` }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Get User Profile
async function getUserProfile(userId) {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Update User Profile
async function updateUserProfile(userId, updates) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.user;
  } catch (error) {
    throw error;
  }
}

// Get User's Games
async function getUserGames(userId) {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}/games`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Create Asset
async function createAsset(name, description, category, price, modelUrl) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`,
        'x-user-id': appState.currentUser.id,
        'x-username': appState.currentUser.username
      },
      body: JSON.stringify({ name, description, category, price, modelUrl })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.asset;
  } catch (error) {
    throw error;
  }
}

// Purchase/Download Asset
async function purchaseAsset(assetId) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/assets/${assetId}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`,
        'x-user-id': appState.currentUser.id
      }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.asset;
  } catch (error) {
    throw error;
  }
}

// Get Robux Balance
async function getRobuxBalance(userId) {
  try {
    const response = await fetch(`${API_BASE}/economy/balance/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.robux;
  } catch (error) {
    console.error('Error getting Robux balance:', error);
    return 0;
  }
}

// Purchase Robux
async function purchaseRobux(userId, amount, paymentMethod = 'credit_card') {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/economy/robux/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`
      },
      body: JSON.stringify({ userId, amount, paymentMethod })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Create Social Post
async function createPost(content, imageUrl = null) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/social/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`,
        'x-user-id': appState.currentUser.id,
        'x-username': appState.currentUser.username
      },
      body: JSON.stringify({ userId: appState.currentUser.id, content, imageUrl })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.post;
  } catch (error) {
    throw error;
  }
}

// Send Message
async function sendMessage(toUserId, content) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/social/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`
      },
      body: JSON.stringify({
        fromUserId: appState.currentUser.id,
        toUserId,
        content
      })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Add Friend
async function addFriend(friendId) {
  if (!appState.token) throw new Error('Not authenticated');
  
  try {
    const response = await fetch(`${API_BASE}/users/${appState.currentUser.id}/friends/${friendId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appState.token}`
      }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    throw error;
  }
}

console.log('API module loaded');
