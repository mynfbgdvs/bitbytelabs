# BitByteLabs - Quick Reference Card

## Server Ports & URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| Backend API | `http://localhost:5000` | REST API endpoints |
| Frontend | `http://localhost:8000` | Web interface |
| API Base | `http://localhost:5000/api` | All API endpoints |

## Startup Commands

### Linux/Mac
```bash
# All in one
./start-all.sh

# Individual
./start-backend.sh  # Terminal 1
./start-frontend.sh # Terminal 2
```

### Windows
```bash
# All in one
start-all.bat

# Individual
start-backend.bat  # Command Prompt 1
start-frontend.bat # Command Prompt 2
```

### Manual
```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
cd frontend
python3 -m http.server 8000
```

## API Endpoints Overview

### Authentication (`/api/auth`)
- `POST /register` - Create account
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /verify` - Check token validity

### Games (`/api/games`)
- `GET /` - Get all games
- `GET /featured` - Get featured games
- `GET /:id` - Get game details
- `POST /` - Create new game
- `PUT /:id` - Update game
- `DELETE /:id` - Delete game
- `POST /:id/play` - Record play
- `POST /:id/like` - Like game
- `POST /:id/rate` - Rate game
- `GET /search/:query` - Search games

### Users (`/api/users`)
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update profile
- `GET /leaderboard` - Get rankings
- `POST /friends/add` - Add friend
- `DELETE /friends/:id` - Remove friend

### Assets (`/api/assets`)
- `GET /` - Get all assets
- `GET /featured` - Get featured assets
- `GET /:id` - Get asset details
- `POST /` - Create asset
- `POST /:id/purchase` - Purchase asset
- `POST /:id/rate` - Rate asset

### Economy (`/api/economy`)
- `GET /balance/:userId` - Get Robux balance
- `POST /robux/purchase` - Purchase Robux
- `POST /robux/transfer` - Transfer Robux
- `POST /earnings/:gameId` - Add earnings
- `GET /transactions/:userId` - Get history

### Social (`/api/social`)
- `GET /feed` - Get social feed
- `POST /posts` - Create post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like post
- `POST /posts/:id/comment` - Comment on post
- `POST /messages/send` - Send message
- `GET /messages/:userId` - Get messages

## Default Test Account

| Field | Value |
|-------|-------|
| Email | `demo@example.com` |
| Password | `demo123` |
| Username | `DemoUser` |
| Starting Robux | `5000` |

## Frontend Structure

| File | Purpose |
|------|---------|
| `index.html` | Main HTML structure, all pages and modals |
| `js/app.js` | Core app logic, navigation, page loading |
| `js/api.js` | API client functions (fetch calls) |
| `js/ui.js` | UI event handlers, modals, forms |
| `js/auth.js` | Authentication flows, login/register |
| `css/styles.css` | Main styling, theme colors, layout |
| `css/responsive.css` | Mobile, tablet, desktop responsive styles |

## Backend Structure

| File | Purpose |
|------|---------|
| `server.js` | Main Express app, route mounting |
| `routes/auth.js` | User registration, login, tokens |
| `routes/games.js` | Game CRUD, play, like, rate |
| `routes/users.js` | Profiles, friends, leaderboard |
| `routes/assets.js` | Asset store operations |
| `routes/economy.js` | Robux system, transactions |
| `routes/social.js` | Posts, messages, social features |

## CSS Variables (Theming)

Edit `frontend/css/styles.css` to customize:

```css
:root {
  --primary-color: #6200ee;      /* Purple */
  --secondary-color: #03dac6;    /* Teal */
  --accent-color: #cf6679;       /* Red */
  --dark-bg: #121212;            /* Dark background */
  --surface: #1e1e1e;            /* Card background */
  --text-primary: #ffffff;       /* Main text */
  --text-secondary: #b0b0b0;     /* Secondary text */
}
```

## Environment Variables (`.env`)

```env
PORT=5000                      # Backend port
NODE_ENV=development          # Environment
JWT_SECRET=your_super_secret_jwt_key_change_in_production
MONGODB_URI=mongodb://localhost:27017/bitbytelabs  # For future use
```

## Important JavaScript Objects

### appState (in app.js)
```javascript
appState = {
  currentUser: null,      // {id, username, email, robux, ...}
  token: null,           // JWT token from login
  games: [],            // All games
  assets: [],           // All assets
  posts: [],            // Social feed posts
  leaderboard: [],      // Player rankings
  currentPage: 'home',  // Current page name
  API_URL: 'http://localhost:5000/api'
}
```

## Common Tasks

### Add a New Feature
1. Create backend route in `backend/routes/newfeature.js`
2. Mount in `backend/server.js`: `app.use('/api/newfeature', newFeatureRoutes)`
3. Create API client function in `frontend/js/api.js`
4. Add UI handler in `frontend/js/ui.js`
5. Update HTML in `frontend/index.html`
6. Test with TESTING.md checklist

### Connect to MongoDB
1. Update `.env`: Set `MONGODB_URI=your_mongodb_connection_string`
2. Uncomment mongoose code in route files
3. Define schemas for each model
4. Update routes to use MongoDB queries instead of Map objects

### Deploy to Production
1. Follow [DEPLOYMENT.md](DEPLOYMENT.md) for platform-specific instructions
2. Update `.env` variables for production
3. Run security checks and tests
4. Deploy backend to hosting service (Heroku, Railway, AWS)
5. Deploy frontend (Vercel, Netlify, AWS)

### Debug Issues
1. Check browser console: `F12` → Console tab
2. Check backend console: Look at terminal running `npm start`
3. Use DevTools Network tab to inspect API calls
4. Enable "Network Throttle" to test slow connections

## File Upload Configuration

Multer is pre-configured in `package.json` (v2.0.2).

To implement file uploads:
1. Create `/uploads` directory
2. Add multer middleware to route
3. Configure storage strategy
4. Add file validation

Example:
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  // Handle file
});
```

## Testing

### Automated Testing
```bash
./test-features.sh
```

### Manual Testing
See [TESTING.md](TESTING.md) for comprehensive 46-test checklist covering:
- User accounts (7 tests)
- Games (9 tests)
- Studio tools (6 tests)
- Asset store (7 tests)
- Economy (6 tests)
- Social (8 tests)
- Leaderboard (3 tests)

### API Testing with cURL
```bash
# Get all games
curl http://localhost:5000/api/games

# Get leaderboard
curl http://localhost:5000/api/users/leaderboard

# Login and get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

## Documentation Files

| File | Contains |
|------|----------|
| [README.md](README.md) | Project overview |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup |
| [API.md](API.md) | Complete API reference |
| [FEATURES.md](FEATURES.md) | Feature workflows |
| [TESTING.md](TESTING.md) | Testing guide & checklist |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment |

## Performance Tips

1. **Database**: Use MongoDB for production (better than in-memory)
2. **Caching**: Add Redis for session/token caching
3. **CDN**: Serve static files from CDN
4. **API**: Add pagination to list endpoints
5. **Frontend**: Lazy load images and components

## Security Notes

- Change `JWT_SECRET` in `.env` before deployment
- Enable HTTPS in production
- Add rate limiting to API
- Validate all user inputs
- Sanitize HTML/text input
- Use environment variables for sensitive data
- Add CSRF protection for forms

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Mobile browsers:
- iOS Safari 14+
- Chrome Android 90+

## Keyboard Shortcuts

(Can be added to app.js)
- `Ctrl+K` / `Cmd+K` - Quick search
- `Ctrl+Q` / `Cmd+Q` - Quick Robux purchase
- `Ctrl+M` / `Cmd+M` - Open messages
- `Esc` - Close modals

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot connect to backend | Run `cd backend && npm start` |
| Frontend not loading | Run `cd frontend && python3 -m http.server 8000` |
| Login not working | Clear localStorage: `localStorage.clear()` in console |
| Buttons not responding | Check browser console (F12) for errors |
| 404 errors on API | Ensure backend is running on port 5000 |
| CORS errors | Backend has CORS enabled, check .env |
| Database empty | Add seed data or create test data manually |

## Resources

- [Node.js Docs](https://nodejs.org/docs/)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Roblox Studio Comparison](https://create.roblox.com/) (for feature inspiration)

## Support & Contact

For issues:
1. Check console errors (F12)
2. Review [FEATURES.md](FEATURES.md) for feature details
3. Check [API.md](API.md) for endpoint specs
4. Review [TESTING.md](TESTING.md) for troubleshooting

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: Production Ready ✅
