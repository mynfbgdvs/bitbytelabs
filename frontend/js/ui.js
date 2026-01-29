// UI Module

// Open auth modal
function openAuthModal() {
  openModal('auth-modal');
  switchAuthMode('login');
}

// Switch between login and register
function switchAuthMode(mode) {
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(`${mode}-form`).classList.add('active');
  event.target.classList.add('active');
}

// Open game creation modal
function openGameCreationModal() {
  if (!appState.currentUser) {
    alert('Please login to create a game');
    openAuthModal();
    return;
  }
  openModal('game-creation-modal');
}

// Open post creation modal
function openPostModal() {
  if (!appState.currentUser) {
    alert('Please login to create a post');
    openAuthModal();
    return;
  }
  openModal('post-modal');
}

// Open asset detail
function openAssetDetail(assetId) {
  const asset = appState.assets.find(a => a.id === assetId);
  if (!asset) return;
  
  alert(`📦 Asset: ${asset.name}\n\nCategory: ${asset.category}\nPrice: ${asset.price === 0 ? 'Free' : asset.price + ' Robux'}\n\nIn a full implementation, you could purchase or download this asset!`);
}

// Open tool modal
function openToolModal(toolName) {
  if (!appState.currentUser) {
    alert('Please login to use studio tools');
    openAuthModal();
    return;
  }
  
  let toolContent = '';
  
  switch(toolName) {
    case 'script':
      toolContent = `
        <h3>📝 Script Editor</h3>
        <p>Write Lua scripts for your games. Use our built-in code editor with syntax highlighting and auto-complete.</p>
        <textarea placeholder="-- Write your Lua script here
function onTouched(hit)
  print('Player touched: ' .. hit.Parent.Name)
end" style="width: 100%; height: 300px; padding: 1rem; border: 1px solid #4b5563; border-radius: 8px; background: #111827; color: #fff; font-family: monospace; margin-top: 1rem;"></textarea>
        <button class="btn-primary" style="margin-top: 1rem; width: 100%;">Save Script</button>
      `;
      break;
    case 'mesh':
      toolContent = `
        <h3>🎨 Mesh Tools</h3>
        <p>Import 3D models and customize them for your games.</p>
        <div style="background: #374151; padding: 2rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
          <p style="font-size: 3rem;">📦</p>
          <p>Drop or upload a .obj, .fbx, or .gltf file</p>
          <button class="btn-primary" style="margin-top: 1rem;">Browse Files</button>
        </div>
        <div style="margin-top: 1rem;">
          <h4>Recent Models</h4>
          <p>Your uploaded models will appear here</p>
        </div>
      `;
      break;
    case 'physics':
      toolContent = `
        <h3>⚙️ Physics Engine Configuration</h3>
        <p>Configure physics for realistic interactions in your game.</p>
        <div style="margin-top: 1rem;">
          <label>Gravity: <input type="range" min="0" max="50" value="20" style="width: 200px;"> 20</label><br><br>
          <label>Friction: <input type="range" min="0" max="1" step="0.1" value="0.5" style="width: 200px;"> 0.5</label><br><br>
          <label>Restitution: <input type="range" min="0" max="1" step="0.1" value="0.3" style="width: 200px;"> 0.3</label><br><br>
          <button class="btn-primary" style="margin-top: 1rem; width: 100%;">Apply Settings</button>
        </div>
      `;
      break;
    case 'sounds':
      toolContent = `
        <h3>🎵 Sound Manager</h3>
        <p>Add background music and sound effects to your game.</p>
        <div style="background: #374151; padding: 2rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
          <p style="font-size: 3rem;">🎵</p>
          <p>Upload audio files (.mp3, .wav, .ogg)</p>
          <button class="btn-primary" style="margin-top: 1rem;">Upload Sound</button>
        </div>
        <div style="margin-top: 1rem;">
          <h4>Your Sounds</h4>
          <p>Your uploaded sounds will appear here</p>
        </div>
      `;
      break;
    case 'ui':
      toolContent = `
        <h3>🖼️ UI Designer</h3>
        <p>Create interactive user interfaces with our visual designer.</p>
        <div style="background: #374151; padding: 2rem; border-radius: 8px; margin-top: 1rem;">
          <div style="background: #1f2937; border: 2px dashed #667eea; padding: 2rem; text-align: center; border-radius: 8px;">
            <p style="color: #9ca3af;">UI Canvas Preview</p>
            <p style="font-size: 2rem; color: #667eea;">+</p>
          </div>
        </div>
        <div style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <button class="btn-secondary">+ Button</button>
          <button class="btn-secondary">+ Label</button>
          <button class="btn-secondary">+ Image</button>
          <button class="btn-secondary">+ Input</button>
        </div>
      `;
      break;
    case 'publish':
      toolContent = `
        <h3>🚀 Publish Game</h3>
        <p>Deploy your game to the BitByteLabs platform.</p>
        <div style="background: #374151; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
          <h4>Game Status</h4>
          <select style="width: 100%; padding: 0.75rem; margin: 0.5rem 0; background: #1f2937; border: 1px solid #4b5563; border-radius: 8px; color: #fff;">
            <option>Draft</option>
            <option>Private</option>
            <option>Public</option>
          </select>
        </div>
        <div style="background: #374151; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
          <h4>Monetization</h4>
          <label style="display: flex; gap: 0.5rem; margin: 0.5rem 0;">
            <input type="checkbox"> Enable Robux sales
          </label>
          <label style="display: flex; gap: 0.5rem; margin: 0.5rem 0;">
            <input type="checkbox"> Earn from game passes
          </label>
        </div>
        <button class="btn-primary" style="width: 100%; margin-top: 1rem;">Publish Game</button>
      `;
      break;
  }
  
  document.getElementById('tool-content').innerHTML = toolContent;
  openModal('tool-modal');
}

// Setup form handlers
document.addEventListener('DOMContentLoaded', () => {
  // Game creation form
  const gameCreationForm = document.getElementById('game-creation-form');
  if (gameCreationForm) {
    gameCreationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('game-title').value;
      const description = document.getElementById('game-description').value;
      const category = document.getElementById('game-category').value;
      const isPublic = document.getElementById('game-public').checked;
      
      try {
        const game = await createGame(title, description, category, isPublic);
        showNotification(`✨ Game "${title}" created!`);
        closeModal('game-creation-modal');
        gameCreationForm.reset();
        loadMyGames();
      } catch (error) {
        alert('Error creating game: ' + error.message);
      }
    });
  }
  
  // Post form
  const postForm = document.getElementById('post-form');
  if (postForm) {
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const content = document.getElementById('post-content').value;
      const imageUrl = document.getElementById('post-image').value;
      
      try {
        await createPost(content, imageUrl || null);
        showNotification('📝 Post published!');
        closeModal('post-modal');
        postForm.reset();
        loadFeed();
      } catch (error) {
        alert('Error creating post: ' + error.message);
      }
    });
  }
});

// Load user's games in studio
async function loadMyGames() {
  if (!appState.currentUser) return;
  
  try {
    const games = await getUserGames(appState.currentUser.id);
    const container = document.getElementById('my-games-list');
    
    if (container) {
      container.innerHTML = games.length > 0
        ? games.map(game => `
            <div class="game-item">
              <h5>${game.title}</h5>
              <div class="game-item-meta">
                <span>${game.status}</span>
                <span>${game.plays} plays</span>
              </div>
              <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="alert('Edit ${game.title}')">Edit</button>
                <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="alert('Publish ${game.title}')">Publish</button>
              </div>
            </div>
          `).join('')
        : '<p>No games yet. Create your first game!</p>';
    }
  } catch (error) {
    console.error('Error loading user games:', error);
  }
}

// Show profile modal
function showProfile(userId) {
  if (!appState.currentUser) {
    openAuthModal();
    return;
  }
  
  const profileContent = `
    <div style="text-align: center;">
      <div style="width: 80px; height: 80px; background: #667eea; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white;">
        ${appState.currentUser.username.charAt(0).toUpperCase()}
      </div>
      <h2>${appState.currentUser.username}</h2>
      <p style="color: #9ca3af;">Level ${appState.currentUser.level || 1} • ${appState.currentUser.experience || 0} XP</p>
      <p style="font-size: 1.5rem; margin: 1rem 0;">💰 ${appState.currentUser.robux || 0} Robux</p>
      
      <button class="btn-primary" style="width: 100%; margin: 1rem 0;" onclick="alert('Robux shop coming soon!')">
        Buy Robux
      </button>
      
      <div style="text-align: left; margin-top: 2rem; background: #374151; padding: 1rem; border-radius: 8px;">
        <h4>Account Stats</h4>
        <p style="margin: 0.5rem 0;"><strong>Email:</strong> ${appState.currentUser.email || 'Not set'}</p>
        <p style="margin: 0.5rem 0;"><strong>Member Since:</strong> Jan 2025</p>
        <p style="margin: 0.5rem 0;"><strong>Games Created:</strong> 0</p>
        <p style="margin: 0.5rem 0;"><strong>Friends:</strong> 0</p>
      </div>
      
      <button class="btn-secondary" style="width: 100%; margin-top: 1rem;" onclick="logoutUser()">
        Logout
      </button>
    </div>
  `;
  
  document.getElementById('profile-content').innerHTML = profileContent;
  openModal('profile-modal');
}

console.log('UI module loaded');
