// Authentication Module

// Check user session on page load
async function checkUserSession() {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      const user = await verifyToken(token);
      if (user) {
        appState.token = token;
        appState.currentUser = user;
        updateUserUI(user);
        
        // Get full user profile with Robux
        try {
          const profile = await getUserProfile(user.id);
          appState.currentUser = { ...appState.currentUser, ...profile };
          updateUserUI(appState.currentUser);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Session check failed:', error);
      localStorage.removeItem('token');
    }
  }
}

// Update UI based on user state
function updateUserUI(user) {
  const authBtn = document.getElementById('auth-btn');
  const robuxDisplay = document.getElementById('robux-display');
  
  if (user) {
    authBtn.textContent = user.username;
    authBtn.onclick = () => showProfile(user.id);
    
    if (robuxDisplay) {
      robuxDisplay.textContent = `💰 ${user.robux || 0}`;
    }
    
    // Load user content
    loadMyGames();
  } else {
    authBtn.textContent = 'Login';
    authBtn.onclick = openAuthModal;
    
    if (robuxDisplay) {
      robuxDisplay.textContent = '💰 0';
    }
  }
}

// Handle login form
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      
      try {
        const response = await loginUser(email, password);
        
        appState.token = response.token;
        appState.currentUser = response.user;
        
        // Store token
        localStorage.setItem('token', response.token);
        
        // Update UI
        updateUserUI(appState.currentUser);
        
        // Close modal and show notification
        closeModal('auth-modal');
        showNotification(`Welcome back, ${response.user.username}! 🎉`);
        
        // Reset form
        loginForm.reset();
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const inputs = registerForm.querySelectorAll('input');
      const username = inputs[0].value;
      const email = inputs[1].value;
      const password = inputs[2].value;
      const confirmPassword = inputs[3].value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      try {
        const response = await registerUser(username, email, password);
        
        appState.token = response.token;
        appState.currentUser = response.user;
        
        // Store token
        localStorage.setItem('token', response.token);
        
        // Update UI
        updateUserUI(appState.currentUser);
        
        // Close modal and show notification
        closeModal('auth-modal');
        showNotification(`Welcome to BitByteLabs, ${response.user.username}! 🎮`);
        
        // Reset form
        registerForm.reset();
      } catch (error) {
        alert('Registration failed: ' + error.message);
      }
    });
  }
});

// Logout user
function logoutUser() {
  appState.currentUser = null;
  appState.token = null;
  localStorage.removeItem('token');
  
  updateUserUI(null);
  closeModal('profile-modal');
  
  showNotification('Logged out successfully 👋');
  navigateTo('home');
}

console.log('Auth module loaded');
