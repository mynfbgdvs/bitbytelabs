# BitByteLabs - Quick Start Guide

Welcome to BitByteLabs! This guide will get you up and running in 5 minutes.

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Python 3** (for running frontend server) - [Download here](https://www.python.org/)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## ⚡ 30-Second Quick Start

### Option 1: Linux/Mac (Recommended)

```bash
# Make scripts executable
chmod +x start-backend.sh start-frontend.sh start-all.sh

# Start everything with one command
./start-all.sh
```

Then open your browser to: **http://localhost:8000**

### Option 2: Windows

```bash
# Run backend
start-backend.bat

# In another terminal, run frontend
start-frontend.bat
```

Then open your browser to: **http://localhost:8000**

### Option 3: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

## 🎮 First Things First

1. **Create an Account**
   - Click "Sign Up" button
   - Fill in username, email, and password
   - Click "Create Account"

2. **Browse Games**
   - Go to "Games" section
   - Search or filter by category
   - Click any game to view details

3. **Create a Game**
   - Go to "Create" section
   - Click "Create New Game"
   - Fill in details and click "Create Game"
   - Use studio tools to develop your game

4. **Join Community**
   - Check "Community" section
   - View leaderboard
   - Create posts and interact with other players

## 🔑 Default Demo Account (Optional)

You can test with these credentials:
- **Email**: `demo@example.com`
- **Password**: `demo123`

Or simply create a new account - it's instant!

## 🛠️ Backend Available Features

Once the backend starts, you can test API endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Create a test game
curl -X POST http://localhost:5000/api/games \
  -H "Content-Type: application/json" \
  -H "x-user-id: test-user" \
  -H "x-username: TestUser" \
  -d '{
    "title": "My Test Game",
    "description": "A fun test game",
    "category": "Action",
    "isPublic": true
  }'
```

## 📁 File Structure at a Glance

```
/backend
  ├── server.js          # Main backend server
  ├── package.json       # Dependencies
  └── routes/            # API endpoints
    ├── auth.js          # Login/Register
    ├── games.js         # Game management
    ├── assets.js        # Asset store
    ├── economy.js       # Robux system
    └── social.js        # Social features

/frontend
  ├── index.html         # Main page
  ├── css/               # Styling
  └── js/                # Application logic
    ├── app.js           # Main app
    ├── api.js           # API client
    ├── ui.js            # UI handlers
    └── auth.js          # Auth handlers
```

## 🌐 Access Points

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 🐛 Troubleshooting

### Server won't start

**Problem**: Port already in use
```bash
# Kill the process using port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Can't access frontend

**Problem**: Python not found
```bash
# Use Node.js instead
npm install -g http-server
cd frontend
http-server -p 8000
```

### CORS errors in browser console

**Problem**: Frontend and backend on different ports (this is normal!)
- Frontend: http://localhost:8000
- Backend: http://localhost:5000
- CORS is enabled in backend

### Login not working

- Make sure backend is running
- Try creating a new account instead
- Check browser console for error messages (F12)

## 📚 Features To Try

### For Players
- ✅ Browse and search games
- ✅ Create an account and login
- ✅ View your profile
- ✅ Like and rate games
- ✅ View leaderboard
- ✅ Create social posts
- ✅ Add friends

### For Developers
- ✅ Create games
- ✅ Use Script Editor
- ✅ Configure physics
- ✅ Manage assets
- ✅ Design UI
- ✅ Publish games
- ✅ Earn Robux

### Economy Features
- ✅ View Robux balance
- ✅ Simulate Robux purchases
- ✅ Transfer Robux
- ✅ Browse asset store
- ✅ Manage marketplace

## 🚀 Next Steps

### For Development
1. Explore the codebase
2. Understand the API structure
3. Customize the theme colors in CSS
4. Add your own features

### For Deployment
1. Get a MongoDB instance (Atlas)
2. Deploy backend to Heroku
3. Deploy frontend to Vercel/Netlify
4. Update API URLs

### For Learning
- Check comments in the code
- Review the API documentation in README.md
- Explore the database structure
- Test API endpoints with Postman

## 💡 Tips

1. **Keep both servers running**: Backend and Frontend need to run simultaneously
2. **Use separate terminals**: Makes it easier to see logs
3. **Check the console**: Press F12 in browser for error messages
4. **Clear cache**: If something looks wrong, do Ctrl+F5
5. **Read the code**: It's well-commented and educational

## 🎓 What You Can Learn

This project covers:
- **Full-stack web development**: Frontend + Backend + Database
- **REST APIs**: How to design and build APIs
- **Authentication**: JWT tokens and security
- **Modern JavaScript**: ES6+, async/await, fetch API
- **CSS**: Modern styling with grid and flexbox
- **Node.js**: Server-side JavaScript with Express
- **Responsive design**: Mobile-friendly layouts

## 📞 Getting Help

1. **Check the main README.md** for detailed API documentation
2. **Look at the code comments** - they explain what's happening
3. **Check browser console** (F12) for JavaScript errors
4. **Check terminal logs** for backend errors
5. **Try different browsers** to rule out browser-specific issues

## 🎉 You're All Set!

Start exploring BitByteLabs and create awesome games!

Questions? Check the README.md or explore the code.

Happy coding! 🚀

---

**Pro Tips:**
- Use the responsive design to test on mobile devices
- Try creating multiple accounts
- Test the full game creation workflow
- Explore different categories
- Check out the social features

Enjoy! 🎮
