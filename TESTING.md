# BitByteLabs - Complete Feature Testing Guide

## Quick Start - Automated Testing

Run the automated test script:

```bash
./test-features.sh
```

This will test all major API endpoints automatically.

---

## Manual Testing Guide

### Prerequisites

1. **Start the servers:**
   ```bash
   ./start-all.sh  # Linux/Mac
   # OR
   start-all.bat   # Windows
   ```

2. **Verify servers are running:**
   - Backend: `http://localhost:5000` (should show API endpoints or allow API calls)
   - Frontend: `http://localhost:8000` (should show the website)

3. **Open the frontend in your browser:**
   ```
   http://localhost:8000
   ```

---

## Feature Testing Checklist

### 1. User Account Management ✅

#### Registration
- [ ] Click "Login" button in navbar
- [ ] Click "Create Account" link in modal
- [ ] Fill in: Username, Email, Password
- [ ] Click "Register"
- [ ] **Expected:** Account created, logged in automatically, redirected to home

#### Login
- [ ] If not logged in, click "Login" in navbar
- [ ] Enter: Email and Password
- [ ] Click "Login"
- [ ] **Expected:** Logged in, token stored, username visible in navbar

#### Profile Viewing
- [ ] Click on username in navbar
- [ ] Click "View Profile"
- [ ] **Expected:** Profile page shows username, email, Robux balance, statistics

#### Profile Editing
- [ ] From profile page, click "Edit Profile"
- [ ] Update: Username or bio
- [ ] Click "Save Changes"
- [ ] **Expected:** Changes saved, page refreshes with new info

#### Friend Management
- [ ] Go to any user's profile
- [ ] Click "Add Friend" button
- [ ] **Expected:** Friend added, button changes to "Remove Friend"
- [ ] [ ] Click "Remove Friend"
- [ ] **Expected:** Friend removed, button reverts

#### Logout
- [ ] Click username in navbar
- [ ] Click "Logout"
- [ ] **Expected:** Logged out, login button reappears, page redirects to home

#### Session Persistence
- [ ] Login to account
- [ ] Refresh the page
- [ ] **Expected:** Still logged in (token persisted in localStorage)

---

### 2. Game Catalog & Creation ✅

#### Browse All Games
- [ ] Click "Games" in navbar
- [ ] **Expected:** Game grid displays all games with title, image, stats

#### Search Games
- [ ] In Games page, use search bar at top
- [ ] Type: Game name or keyword
- [ ] Press Enter
- [ ] **Expected:** Games filtered by search term

#### Filter Games
- [ ] In Games page, use category filter dropdown
- [ ] Select: Any category (Action, Adventure, Simulation, etc.)
- [ ] **Expected:** Games filtered by category only

#### View Game Details
- [ ] Click any game card
- [ ] **Expected:** Modal opens with:
  - Game title, description, creator, likes, plays, rating
  - "Play Game" button
  - "Like" and "Rate Game" buttons
  - Comments/reviews section
  - Creator info

#### Play Game
- [ ] From game detail modal, click "Play Game"
- [ ] **Expected:** Game play recorded, play count increments

#### Create Game
- [ ] Click "Create" in navbar
- [ ] Click "Create New Game"
- [ ] Fill in: Title, Description, Category
- [ ] Toggle "Public" if desired
- [ ] Click "Create Game"
- [ ] **Expected:** Game created, appears in your profile and Games page

#### Publish Game
- [ ] From game detail, if you're the creator, click "Publish"
- [ ] **Expected:** Game published, now visible to other players

#### Like Game
- [ ] From game detail modal, click heart icon or "Like"
- [ ] **Expected:** Like count increments by 1

#### Rate Game
- [ ] From game detail modal, click "Rate Game"
- [ ] Select: Star rating (1-5)
- [ ] Click "Submit Rating"
- [ ] **Expected:** Rating recorded, average rating updates

---

### 3. Development Studio (6 Tools) ✅

#### Access Studio
- [ ] From game detail page, click "Open in Studio" (if creator)
- [ ] **Expected:** Studio view opens with toolbox on left

#### Tool 1: Script Editor
- [ ] Click "Script Editor" in toolbox
- [ ] Write some Lua code in the text area
- [ ] Click "Save Script"
- [ ] **Expected:** Script saved with confirmation

#### Tool 2: Mesh Editor
- [ ] Click "Mesh Editor" in toolbox
- [ ] Specify dimensions: Width, Height, Depth
- [ ] Click "Create Mesh"
- [ ] **Expected:** Mesh preview and confirmation

#### Tool 3: Physics Properties
- [ ] Click "Physics" in toolbox
- [ ] Toggle: Gravity, Collision
- [ ] Set: Density (0-1)
- [ ] Click "Apply Physics"
- [ ] **Expected:** Physics settings saved

#### Tool 4: Sound Manager
- [ ] Click "Sound" in toolbox
- [ ] Enter sound URL
- [ ] Set: Volume (0-100), Loop (on/off)
- [ ] Click "Add Sound"
- [ ] **Expected:** Sound added to game

#### Tool 5: UI Designer
- [ ] Click "UI" in toolbox
- [ ] Select element: Button, Label, TextBox
- [ ] Configure: Position, Size, Text/Color
- [ ] Click "Add UI Element"
- [ ] **Expected:** UI element added to preview

#### Tool 6: Game Publisher
- [ ] Click "Publisher" in toolbox
- [ ] Review game info (auto-populated from game data)
- [ ] Click "Publish Game"
- [ ] **Expected:** Game published/updated, confirmation shown

---

### 4. Asset Store ✅

#### Browse Assets
- [ ] Click "Assets" in navbar
- [ ] **Expected:** Asset grid shows 3D models, scripts, sounds, textures

#### Search Assets
- [ ] Use search bar in Assets page
- [ ] Type: Asset name or type
- [ ] **Expected:** Assets filtered by search

#### Filter Assets
- [ ] Use category filter dropdown
- [ ] Select: 3D Model, Script, Sound, Texture, etc.
- [ ] **Expected:** Assets filtered by category

#### View Asset Details
- [ ] Click any asset
- [ ] **Expected:** Modal shows:
  - Asset name, image, description
  - Creator name, rating, purchase count
  - Price (Free or Robux amount)
  - Download/Use button

#### Purchase Asset
- [ ] Click "Purchase" on a paid asset
- [ ] If insufficient Robux: See purchase prompt
- [ ] If sufficient: Asset added to inventory
- [ ] **Expected:** Robux deducted, asset owned

#### Use Free Asset
- [ ] Click "Use" on a free asset
- [ ] **Expected:** Asset added to inventory/library

#### Rate Asset
- [ ] From asset detail, click "Rate"
- [ ] Select: Star rating (1-5)
- [ ] **Expected:** Rating recorded, asset rating updates

#### Upload Asset
- [ ] Click "Upload Asset" button
- [ ] Fill: Name, Description, Category, Price
- [ ] Click "Create Asset"
- [ ] **Expected:** Asset created, visible to other players

---

### 5. Robux Economy ✅

#### Check Robux Balance
- [ ] Click profile icon (username) in navbar
- [ ] Click "View Profile"
- [ ] **Expected:** Current Robux balance displayed

#### Purchase Robux
- [ ] In profile or any page, click "Buy Robux"
- [ ] Modal opens with Robux packages:
  - 400 Robux - $5
  - 1000 Robux - $10
  - 5000 Robux - $40
  - 10000 Robux - $80
- [ ] Click any package
- [ ] **Expected:** Purchase simulated (demo mode), Robux added to balance

#### Robux from Game Sales
- [ ] If you created a paid game with sales:
- [ ] Check "Earnings" section in profile
- [ ] **Expected:** Shows Robux earned from game sales

#### Transfer Robux
- [ ] Go to another user's profile
- [ ] Click "Send Robux"
- [ ] Enter amount
- [ ] Click "Transfer"
- [ ] **Expected:** Robux transferred, both users' balances update

#### Transaction History
- [ ] In profile, click "Transaction History"
- [ ] **Expected:** Shows all purchases, transfers, and earnings

#### Use Robux
- [ ] In asset store, purchase a paid asset
- [ ] **Expected:** Robux deducted from balance

---

### 6. Social Features ✅

#### Create Post
- [ ] Click "Community" in navbar
- [ ] Click "Create Post"
- [ ] Enter: Post content (text and/or image URL)
- [ ] Click "Post"
- [ ] **Expected:** Post appears at top of feed

#### View Social Feed
- [ ] Click "Community" in navbar
- [ ] **Expected:** Feed shows all posts with:
  - Username, timestamp, content
  - Like count, comment count
  - "Like" and "Comment" buttons

#### Like Post
- [ ] Click heart icon on any post
- [ ] **Expected:** Like count increments, heart fills in

#### Comment on Post
- [ ] Click "Comment" on any post
- [ ] Type your comment
- [ ] Press Enter or click "Post"
- [ ] **Expected:** Comment appears under post

#### Delete Post (Your Own)
- [ ] On a post you created, click "Delete"
- [ ] **Expected:** Post removed from feed

#### Follow User
- [ ] From any post, click on creator's username
- [ ] Click "Follow" button
- [ ] **Expected:** Follow added, button changes to "Following"

---

### 7. Messaging System ✅

#### Send Message
- [ ] Click on any user's profile
- [ ] Click "Send Message"
- [ ] Enter: Message text
- [ ] Click "Send"
- [ ] **Expected:** Message sent, confirmation shown

#### View Messages
- [ ] Click "Messages" in navbar (if available) or in profile dropdown
- [ ] **Expected:** List of message conversations

#### Conversation View
- [ ] Click any conversation
- [ ] **Expected:** Shows message thread with sender, receiver, timestamps

#### Mark as Read
- [ ] From messages list, new messages should be marked
- [ ] Click to open conversation
- [ ] **Expected:** Message marked as read

#### Delete Conversation
- [ ] From messages list, delete a conversation
- [ ] **Expected:** Conversation removed

---

### 8. Leaderboard System ✅

#### View Global Leaderboard
- [ ] Click "Leaderboard" in navbar or menu
- [ ] **Expected:** Shows top 50 players by Robux/Level
  - Rank number, Username, Robux balance, Games created, Games played

#### Filter by Metric
- [ ] On leaderboard, use filter: Robux, Games Created, Games Played
- [ ] Select: Any metric
- [ ] **Expected:** Leaderboard re-sorts by selected metric

#### Search Player
- [ ] Use search on leaderboard
- [ ] Type: Player username
- [ ] **Expected:** Player highlighted/shown if on leaderboard

#### View Player Rank
- [ ] Look at own position on leaderboard
- [ ] **Expected:** Shows your rank, stats compared to others

#### Monthly Rankings
- [ ] Check if monthly toggle exists
- [ ] **Expected:** Shows current month's top earners

---

### 9. Rating & Review System ✅

#### Rate Game
- [ ] Open any game detail
- [ ] Click "Rate Game"
- [ ] Select: 1-5 stars
- [ ] Click "Submit"
- [ ] **Expected:** Rating recorded, average game rating updates

#### View Game Reviews
- [ ] In game detail modal, scroll to reviews section
- [ ] **Expected:** Shows all reviews with:
  - Username, rating, date, review text

#### Write Review
- [ ] In game detail modal, click "Write Review"
- [ ] Enter: Star rating and review text
- [ ] Click "Post Review"
- [ ] **Expected:** Review posted, appears in list

#### Rate Asset
- [ ] Open asset detail
- [ ] Click "Rate"
- [ ] Select: 1-5 stars
- [ ] **Expected:** Rating recorded, asset rating updates

#### Delete Review (Your Own)
- [ ] On a review you wrote, click "Delete"
- [ ] **Expected:** Review removed

---

## Advanced Testing

### Cross-Feature Integration

#### Game Creation → Monetization
- [ ] Create a game
- [ ] In studio, set a price (premium game)
- [ ] Publish game
- [ ] Purchase the game as different user
- [ ] Check earnings
- [ ] **Expected:** Creator receives Robux

#### Asset Store → Game Development
- [ ] Purchase an asset
- [ ] Create a new game
- [ ] In studio, verify asset is available for use
- [ ] **Expected:** Asset appears in game assets library

#### Social → Discovery
- [ ] Post about a game
- [ ] Other user clicks link in post
- [ ] **Expected:** Taken to game detail page

#### Leaderboard → Competition
- [ ] Create multiple games
- [ ] Play them as different users
- [ ] Check leaderboard
- [ ] **Expected:** Rankings reflect plays/earnings

---

## Performance Testing

### Load Testing
- [ ] Open Games page (many cards rendering)
- [ ] Scroll through list
- [ ] **Expected:** Smooth scrolling, no lag

### Responsiveness
- [ ] Open frontend on mobile (360px width)
- [ ] Open on tablet (768px width)
- [ ] Open on desktop (1920px width)
- [ ] **Expected:** Layout adapts, no overflow, readable text

### Network Testing
- [ ] Simulate slow network (DevTools → Network → Throttle)
- [ ] Perform actions: Create post, search games, upload asset
- [ ] **Expected:** Loading indicators show, requests complete eventually

---

## Troubleshooting

### Issue: "Cannot connect to server"
**Solution:**
```bash
cd backend
npm start
```

### Issue: "Page not loading"
**Solution:**
```bash
cd frontend
python3 -m http.server 8000
```

### Issue: "Buttons not working"
**Solution:**
1. Check browser console for errors (F12)
2. Verify server is running
3. Clear localStorage: `localStorage.clear()` in console

### Issue: "Login fails"
**Solution:**
1. Use demo account: `demo@example.com` / `demo123`
2. Or create new account
3. Check console for error details

### Issue: "Can't find game details"
**Solution:**
1. Ensure database has games (check backend console)
2. Try refreshing page (F5)
3. Create a game to test

---

## API Testing with cURL

### Test Authentication
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'

# Response includes token - use in headers
```

### Test Games Endpoint
```bash
# Get all games
curl http://localhost:5000/api/games

# Get featured games
curl http://localhost:5000/api/games/featured

# Create game (requires token)
curl -X POST http://localhost:5000/api/games \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Game","description":"Test","category":"Action","isPublic":true}'
```

### Test Economy
```bash
# Get Robux balance
curl http://localhost:5000/api/economy/balance/demo

# Purchase Robux
curl -X POST http://localhost:5000/api/economy/robux/purchase \
  -H "Content-Type: application/json" \
  -d '{"userId":"demo","amount":1000}'
```

---

## Completion Criteria

### All features considered "Complete" when:
- ✅ Feature is accessible from frontend
- ✅ Frontend properly calls backend API
- ✅ Backend processes request and returns response
- ✅ Data persists across page refreshes
- ✅ No console errors
- ✅ UI updates reflect backend response

### Project considered "Ready for Deployment" when:
- ✅ All 46 tests in this checklist pass
- ✅ No errors in browser console
- ✅ No errors in server console
- ✅ Responsive design works on all screen sizes
- ✅ All navigation links functional
- ✅ All forms validate properly

---

## Next Steps

After passing all tests:

1. **Customize**: Edit CSS variables in `frontend/css/styles.css` to match your brand
2. **Database**: Migrate to MongoDB by updating `.env` and model definitions
3. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
4. **Extend**: Add new features by creating route files and frontend modules

---

## Support

For issues or questions:
1. Check [API.md](API.md) for endpoint documentation
2. Review [FEATURES.md](FEATURES.md) for feature workflows
3. Check backend logs: `npm start` output
4. Check frontend logs: Browser DevTools Console (F12)

Happy testing! 🎮
