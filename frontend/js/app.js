// Main application state
const appState = {
  currentUser: null,
  token: null,
  currentPage: 'home',
  games: [],
  assets: [],
  posts: [],
  leaderboard: [],
  API_URL: 'http://localhost:5000/api'
};

// Navigation
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show selected page
  const pageElement = document.getElementById(`${page}-page`);
  if (pageElement) {
    pageElement.classList.add('active');
    appState.currentPage = page;
    
    // Load page-specific content
    loadPageContent(page);
  }
}

function loadPageContent(page) {
  switch(page) {
    case 'home':
      loadFeaturedGames();
      break;
    case 'games':
      loadAllGames();
      break;
    case 'assets':
      loadAssets();
      break;
    case 'community':
      loadFeed();
      loadLeaderboard();
      break;
  }
}

// Load featured games
async function loadFeaturedGames() {
  try {
    const response = await fetch(`${appState.API_URL}/games/featured`);
    const games = await response.json();
    appState.games = games;
    
    const container = document.getElementById('featured-games');
    if (container) {
      container.innerHTML = games.map(game => createGameCard(game)).join('');
    }
  } catch (error) {
    console.error('Error loading featured games:', error);
  }
}

// Load all games
async function loadAllGames() {
  try {
    const response = await fetch(`${appState.API_URL}/games`);
    const games = await response.json();
    appState.games = games;
    
    const container = document.getElementById('games-container');
    if (container) {
      container.innerHTML = games.map(game => createGameCard(game)).join('');
    }
  } catch (error) {
    console.error('Error loading games:', error);
  }
}

// Load assets
async function loadAssets() {
  try {
    const response = await fetch(`${appState.API_URL}/assets`);
    const assets = await response.json();
    appState.assets = assets;
    
    const container = document.getElementById('assets-container');
    if (container) {
      container.innerHTML = assets.map(asset => createAssetCard(asset)).join('');
    }
  } catch (error) {
    console.error('Error loading assets:', error);
  }
}

// Load feed posts
async function loadFeed() {
  try {
    const response = await fetch(`${appState.API_URL}/social/feed`);
    const posts = await response.json();
    appState.posts = posts;
    
    const container = document.getElementById('feed-container');
    if (container) {
      container.innerHTML = posts.length > 0 
        ? posts.map(post => createPostCard(post)).join('')
        : '<p>No posts yet. Be the first to post!</p>';
    }
  } catch (error) {
    console.error('Error loading feed:', error);
  }
}

// Load leaderboard
async function loadLeaderboard() {
  try {
    const response = await fetch(`${appState.API_URL}/users/leaderboard`);
    const leaderboard = await response.json();
    appState.leaderboard = leaderboard;
    
    const container = document.getElementById('leaderboard-container');
    if (container) {
      container.innerHTML = leaderboard.slice(0, 10).map((user, i) => createLeaderboardItem(user, i)).join('');
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
}

// Search games
function searchGames() {
  const query = document.getElementById('search-input')?.value || '';
  const category = document.getElementById('category-filter')?.value || '';
  
  let results = appState.games.filter(game => {
    const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase()) ||
                        game.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || game.category === category;
    return matchesQuery && matchesCategory;
  });
  
  const container = document.getElementById('games-container');
  if (container) {
    container.innerHTML = results.length > 0
      ? results.map(game => createGameCard(game)).join('')
      : '<p>No games found.</p>';
  }
}

// Create game card HTML
function createGameCard(game) {
  const emoji = getGameEmoji(game.category);
  return `
    <div class="game-card" onclick="openGameDetail('${game.id}')">
      <div class="game-thumbnail">${emoji}</div>
      <div class="game-info">
        <h4>${game.title}</h4>
        <div class="game-meta">
          <span>👤 ${game.plays || 0} plays</span>
          <span>⭐ ${game.rating || 0}</span>
        </div>
        <p class="game-creator">By ${game.creatorName || 'Unknown'}</p>
        <p class="game-description">${game.description.substring(0, 60)}...</p>
      </div>
    </div>
  `;
}

// Create asset card HTML
function createAssetCard(asset) {
  const emoji = getAssetEmoji(asset.category);
  return `
    <div class="asset-card" onclick="openAssetDetail('${asset.id}')">
      <div class="asset-thumbnail">${emoji}</div>
      <div class="asset-info">
        <h4>${asset.name}</h4>
        <div class="asset-meta">
          <span>⭐ ${asset.rating || 0}</span>
          <span>💰 ${asset.price === 0 ? 'Free' : asset.price + ' Robux'}</span>
        </div>
        <p class="asset-description">${asset.description.substring(0, 60)}...</p>
        <p class="game-creator">By ${asset.creatorName || 'Unknown'}</p>
      </div>
    </div>
  `;
}

// Create post card HTML
function createPostCard(post) {
  const date = new Date(post.createdAt).toLocaleDateString();
  return `
    <div class="post-card">
      <div class="post-header">
        <div class="post-avatar">${post.username.charAt(0).toUpperCase()}</div>
        <div class="post-author-info">
          <div class="post-author">${post.username}</div>
          <div class="post-time">${date}</div>
        </div>
      </div>
      <div class="post-content">${post.content}</div>
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image" class="post-image">` : ''}
      <div class="post-actions">
        <span class="post-action" onclick="likePost('${post.id}')">👍 ${post.likes}</span>
        <span class="post-action" onclick="commentPost('${post.id}')">💬 ${post.comments.length}</span>
        <span class="post-action">🔗 ${post.shares}</span>
      </div>
    </div>
  `;
}

// Create leaderboard item HTML
function createLeaderboardItem(user, index) {
  const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
  return `
    <div class="leaderboard-item">
      <span class="leaderboard-rank ${index < 3 ? 'top' : ''}">${rankEmoji}</span>
      <div class="leaderboard-info">
        <div class="leaderboard-username">${user.username}</div>
        <div class="leaderboard-stats">Level ${user.level} • ${user.experience} XP</div>
      </div>
      <div class="leaderboard-value">💰 ${user.robux || 0}</div>
    </div>
  `;
}

// Get emoji for game category
function getGameEmoji(category) {
  const emojis = {
    'Action': '⚡',
    'Adventure': '🗺️',
    'Puzzle': '🧩',
    'Racing': '🏎️',
    'RPG': '⚔️',
    'Simulation': '🚀',
    'Other': '🎮'
  };
  return emojis[category] || '🎮';
}

// Get emoji for asset category
function getAssetEmoji(category) {
  const emojis = {
    '3D Model': '🎨',
    'Script': '📝',
    'Sound': '🎵',
    'Texture': '🖼️',
    'Plugin': '🔌',
    'Other': '📦'
  };
  return emojis[category] || '📦';
}

// Open game detail modal
function openGameDetail(gameId) {
  const game = appState.games.find(g => g.id === gameId);
  if (!game) return;
  
  const emoji = getGameEmoji(game.category);
  const detailContent = `
    <div style="text-align: center;">
      <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
      <h2>${game.title}</h2>
      <p style="color: #d1d5db; margin: 1rem 0; font-size: 0.9rem;">By ${game.creatorName}</p>
      <p style="margin: 1rem 0;">${game.description}</p>
      
      <div style="background: #374151; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <p style="color: #9ca3af; font-size: 0.9rem;">Category</p>
            <p style="font-weight: bold;">${game.category}</p>
          </div>
          <div>
            <p style="color: #9ca3af; font-size: 0.9rem;">Status</p>
            <p style="font-weight: bold; text-transform: capitalize;">${game.status}</p>
          </div>
          <div>
            <p style="color: #9ca3af; font-size: 0.9rem;">Plays</p>
            <p style="font-weight: bold;">${game.plays || 0}</p>
          </div>
          <div>
            <p style="color: #9ca3af; font-size: 0.9rem;">Rating</p>
            <p style="font-weight: bold;">⭐ ${game.rating || 0}</p>
          </div>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn-primary" onclick="playGame('${game.id}'); closeModal('game-detail-modal')">
          ▶️ Play Now
        </button>
        <button class="btn-secondary" onclick="likeGame('${game.id}')">
          ❤️ Like (${game.likes || 0})
        </button>
      </div>
      
      <div style="margin-top: 2rem; text-align: left;">
        <h4>Rate this game:</h4>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          ${[1,2,3,4,5].map(i => `<span style="font-size: 2rem; cursor: pointer;" onclick="rateGame('${game.id}', ${i})">⭐</span>`).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('game-detail-content').innerHTML = detailContent;
  openModal('game-detail-modal');
}

// Play game
function playGame(gameId) {
  const game = appState.games.find(g => g.id === gameId);
  if (!game) return;
  
  alert(`🎮 Launching "${game.title}"...\n\nIn a full implementation, this would launch the game!`);
  
  // Increment play count
  fetch(`${appState.API_URL}/games/${gameId}/play`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': appState.token ? `Bearer ${appState.token}` : ''
    }
  }).catch(console.error);
}

// Like game
function likeGame(gameId) {
  fetch(`${appState.API_URL}/games/${gameId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': appState.token ? `Bearer ${appState.token}` : ''
    }
  })
  .then(r => r.json())
  .then(data => {
    const game = appState.games.find(g => g.id === gameId);
    if (game) game.likes = data.likes;
    showNotification('Game liked! ❤️');
  })
  .catch(console.error);
}

// Rate game
function rateGame(gameId, rating) {
  fetch(`${appState.API_URL}/games/${gameId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': appState.token ? `Bearer ${appState.token}` : ''
    },
    body: JSON.stringify({ rating })
  })
  .then(r => r.json())
  .then(data => showNotification(`Thanks for rating! ⭐ Avg: ${data.averageRating}`))
  .catch(console.error);
}

// Like post
function likePost(postId) {
  if (!appState.currentUser) {
    openAuthModal();
    return;
  }
  
  fetch(`${appState.API_URL}/social/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${appState.token}`,
      'x-user-id': appState.currentUser.id
    }
  })
  .then(r => r.json())
  .then(data => loadFeed())
  .catch(console.error);
}

// Comment on post
function commentPost(postId) {
  if (!appState.currentUser) {
    openAuthModal();
    return;
  }
  
  const comment = prompt('Write a comment:');
  if (!comment) return;
  
  fetch(`${appState.API_URL}/social/posts/${postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${appState.token}`,
      'x-user-id': appState.currentUser.id,
      'x-username': appState.currentUser.username
    },
    body: JSON.stringify({ comment })
  })
  .then(r => r.json())
  .then(data => loadFeed())
  .catch(console.error);
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 3000;
    animation: slideIn 0.3s ease-in;
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for search
  document.getElementById('search-input')?.addEventListener('input', searchGames);
  document.getElementById('category-filter')?.addEventListener('change', searchGames);
  
  // Load initial content
  loadFeaturedGames();
  
  // Check if user is logged in
  checkUserSession();
});
