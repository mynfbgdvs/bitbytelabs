## Hi there 👋

<!--
**bitbytelabs/bitbytelabs** is a ✨ _special_ ✨ repository because its `# BitByteLabs Gaming Platform

A comprehensive gaming platform similar to Roblox, built with Node.js backend and vanilla JavaScript frontend. Create, play, and share games with a full-featured gaming ecosystem.

## 🎮 Features

### Core Platform Features
- **User Authentication**: Register and login system with JWT tokens
- **Game Catalog**: Browse, search, and filter thousands of games
- **Game Creation Studio**: Full development tools for game creators
- **Asset Store**: Marketplace for 3D models, scripts, sounds, and textures
- **Social Features**: User profiles, friend lists, social feed, and messaging
- **Economy System**: Robux currency system with purchases and transfers
- **Leaderboard**: Competitive rankings based on Robux and experience
- **Rating System**: Rate and review games and assets

### Game Development Tools
- **Script Editor**: Write Lua scripts with syntax highlighting
- **Mesh Tools**: Import and customize 3D models
- **Physics Engine**: Configure realistic physics for games
- **Sound Manager**: Add background music and sound effects
- **UI Designer**: Create interactive user interfaces
- **Game Publisher**: Deploy games to the platform

### Social Features
- **User Profiles**: Customize your profile with avatar and bio
- **Friends List**: Add and manage friends
- **Social Feed**: Share posts and updates with the community
- **Messaging**: Private messaging between users
- **Comments & Likes**: Engage with community content
- **Following System**: Follow creators and get their latest games

### Economy & Monetization
- **Robux Currency**: Primary in-game currency
- **Robux Purchases**: Buy Robux with real money (simulated)
- **Game Monetization**: Earn Robux from your games
- **Asset Sales**: Sell assets in the marketplace
- **Game Passes**: Optional premium game content
- **Creator Fund**: Support creators through revenue sharing

### Additional Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Interface**: Eye-friendly dark theme
- **Search & Filtering**: Find games by category and keywords
- **Real-time Updates**: Live notifications and updates
- **Admin Tools**: Manage platform content (extensible)

## 📁 Project Structure

```
bitbytelabs/
├── backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Dependencies
│   ├── .env                       # Environment configuration
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── games.js              # Game management routes
│   │   ├── users.js              # User profile routes
│   │   ├── assets.js             # Asset store routes
│   │   ├── economy.js            # Currency and transactions
│   │   └── social.js             # Social features routes
│   ├── controllers/              # Business logic (ready for expansion)
│   └── models/                   # Data models (ready for expansion)
│
├── frontend/
│   ├── index.html                # Main HTML file
│   ├── css/
│   │   ├── styles.css            # Main styles
│   │   └── responsive.css        # Responsive design
│   ├── js/
│   │   ├── app.js                # Main application logic
│   │   ├── api.js                # API client functions
│   │   ├── ui.js                 # UI interaction handlers
│   │   └── auth.js               # Authentication handlers
│   └── images/                   # Static images (ready for content)
│
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. **Navigate to backend directory**
```bash
cd /workspaces/bitbytelabs/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the backend server**
```bash
npm start
```

The server will start on `http://localhost:5000`

### Running the Frontend

1. **Navigate to frontend directory**
```bash
cd /workspaces/bitbytelabs/frontend
```

2. **Start a simple HTTP server** (from frontend directory)
```bash
python3 -m http.server 8000
```

Or use another method:
```bash
npx http-server
```

3. **Open in browser**
Visit `http://localhost:8000` in your browser

## 📝 Usage Guide

### For Players

1. **Create an Account**
   - Click "Sign Up" in the auth modal
   - Enter username, email, and password
   - Start playing games immediately

2. **Browse Games**
   - Use the search bar to find specific games
   - Filter by category (Action, Adventure, Puzzle, etc.)
   - Click on any game card to view details and play

3. **Explore Asset Store**
   - Browse 3D models, scripts, sounds, and textures
   - Filter by category and rating
   - Purchase free or paid assets

4. **Join Community**
   - View the leaderboard
   - Create posts and engage with other players
   - Send messages to friends
   - Like and comment on content

### For Game Developers

1. **Create a Game**
   - Click "Create" in the navigation
   - Click "Create New Game"
   - Fill in title, description, and category
   - Game enters development mode

2. **Use Development Tools**
   - **Script Editor**: Write game logic in Lua
   - **Mesh Tools**: Upload 3D models
   - **Physics Engine**: Configure game physics
   - **Sound Manager**: Add audio
   - **UI Designer**: Create interfaces

3. **Publish Your Game**
   - Set visibility (Private/Public)
   - Configure monetization options
   - Click "Publish Game"
   - Game appears in the catalog

4. **Earn Money**
   - Earn Robux from game plays
   - Sell game passes
   - Receive creator payouts

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify token

### Games
- `GET /api/games` - Get all games
- `GET /api/games/featured` - Get featured games
- `GET /api/games/:id` - Get game details
- `POST /api/games` - Create new game
- `PUT /api/games/:id` - Update game
- `DELETE /api/games/:id` - Delete game
- `POST /api/games/:id/play` - Record game play
- `POST /api/games/:id/like` - Like a game
- `POST /api/games/:id/rate` - Rate a game
- `GET /api/games/search` - Search games

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users/:id/games` - Get user's games
- `GET /api/users/:id/friends` - Get user's friends
- `POST /api/users/:id/friends/:friendId` - Add friend
- `DELETE /api/users/:id/friends/:friendId` - Remove friend
- `GET /api/users/leaderboard` - Get leaderboard

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get asset details
- `POST /api/assets` - Create asset
- `POST /api/assets/:id/purchase` - Purchase asset
- `POST /api/assets/:id/rate` - Rate asset
- `GET /api/assets/featured` - Get featured assets

### Economy
- `GET /api/economy/balance/:userId` - Get Robux balance
- `POST /api/economy/robux/purchase` - Purchase Robux
- `POST /api/economy/robux/transfer` - Transfer Robux
- `POST /api/economy/earnings/add` - Add earnings
- `GET /api/economy/transactions/:userId` - Get transaction history
- `POST /api/economy/marketplace/list` - List item for sale

### Social
- `POST /api/social/posts` - Create post
- `GET /api/social/feed` - Get social feed
- `GET /api/social/user/:userId/posts` - Get user posts
- `POST /api/social/posts/:postId/like` - Like post
- `POST /api/social/posts/:postId/comment` - Comment on post
- `POST /api/social/messages/send` - Send message
- `GET /api/social/messages/:userId` - Get messages
- `PUT /api/social/messages/:messageId/read` - Mark message as read

## 🎨 Customization

### Theme Colors
Edit the CSS variables in `frontend/css/styles.css`:
```css
:root {
  --primary-color: #1f2937;
  --secondary-color: #3b82f6;
  --accent-color: #10b981;
  /* ... other colors ... */
}
```

### Backend Configuration
Edit `backend/.env`:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
MONGODB_URI=mongodb://localhost:27017/bitbytelabs
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Protected routes with middleware
- Secure token storage in localStorage

## 📊 Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] Real payment gateway integration
- [ ] WebSocket support for real-time features
- [ ] Video chat for social features
- [ ] Advanced physics engine
- [ ] Multiplayer game hosting
- [ ] Mobile app versions
- [ ] VR/AR support
- [ ] Advanced analytics dashboard
- [ ] Automated content moderation

## 🐛 Development & Debugging

### Common Issues

**Server won't start:**
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill process if needed
kill -9 <PID>
```

**Frontend can't connect to backend:**
- Make sure backend is running on `http://localhost:5000`
- Check CORS is enabled
- Verify API_URL in `frontend/js/app.js`

**CORS errors:**
- Backend has CORS enabled by default
- Check that frontend and backend are on different ports

### Testing Demo Account
The app includes a demo login feature. Use any credentials to test:
- Email: `demo@example.com`
- Password: `demo123`

Or create a new account through the Sign Up form.

## 📦 Dependencies

### Backend
- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **mongoose** - MongoDB ODM (optional)
- **dotenv** - Environment configuration
- **express-validator** - Input validation
- **uuid** - ID generation

### Frontend
- Pure HTML5
- Vanilla CSS3
- Vanilla JavaScript (ES6+)
- No external dependencies

## 📄 License

MIT License - Feel free to use and modify

## 👥 Contributing

This is a demo/educational project. Feel free to fork and customize!

## 📞 Support

For issues or questions:
1. Check the README and API documentation
2. Review the code structure and comments
3. Check browser console for errors
4. Verify backend is running

## 🎓 Learning Resources

This project demonstrates:
- **Backend**: Node.js, Express, REST API design, middleware
- **Frontend**: DOM manipulation, Fetch API, localStorage, responsive design
- **Authentication**: JWT tokens, password hashing, session management
- **UI/UX**: Modern dark theme, responsive layout, user interaction patterns

## 🚀 Deployment

### Deploy Backend to Heroku
```bash
cd backend
heroku login
heroku create bitbytelabs-api
git push heroku main
```

### Deploy Frontend to Vercel/Netlify
```bash
npm run build
# Deploy dist folder to your hosting service
```

---

**Built with ❤️ by BitByteLabs Team**

Enjoy creating and playing games! 🎮` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
