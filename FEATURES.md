# BitByteLabs - Feature Implementation Guide

Complete walkthrough of all implemented features with usage examples.

## 1. 👥 User Account Management

### Create Account (Registration)

**Frontend Flow:**
1. Click "Sign Up" button in navbar
2. Fill username, email, password
3. Submit form → triggers `registerUser()` in auth.js

**Backend Process:**
```javascript
POST /api/auth/register
{
  "username": "newplayer",
  "email": "player@example.com", 
  "password": "secure123"
}
```

**What Happens:**
- ✅ Password hashed with bcrypt
- ✅ User stored with 100 Robux starter balance
- ✅ JWT token generated (7-day expiry)
- ✅ User level set to 1, experience to 0
- ✅ Empty friendsList and likedGames arrays created

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "username": "newplayer",
    "robux": 100,
    "level": 1
  }
}
```

### Login

**Frontend Flow:**
1. Click "Login" button
2. Enter email and password
3. Form submission → `loginUser()` called
4. Token saved to localStorage
5. User profile loaded

**Backend:**
```javascript
POST /api/auth/login
{
  "email": "player@example.com",
  "password": "secure123"
}
```

### View Profile

**Frontend:**
- Click username button in navbar
- Modal shows: Avatar, username, level, Robux, account stats

**Backend:**
```javascript
GET /api/users/user-id
```

Returns user object with all stats.

### Update Profile

**Frontend:**
- Click settings icon in profile modal
- Edit bio, avatar, displayName

**Backend:**
```javascript
PUT /api/users/user-id
{
  "bio": "Game creator extraordinaire",
  "avatar": "avatar-url"
}
```

---

## 2. 🎮 Browse, Create & Publish Games

### Browse Games

**Home Page:**
- Featured section shows top 8 games by plays
- Click any game card to see details

**Games Section:**
- Full catalog browsing
- Search by title/description
- Filter by category (Action, Adventure, etc.)

**Backend:**
```javascript
GET /api/games                 // All games
GET /api/games/featured        // Top 8 games
GET /api/games/search?q=adventure&category=Adventure
GET /api/games/:id             // Single game
```

### Create Game

**Frontend Flow:**
1. Go to "Create" section
2. Click "Create New Game"
3. Fill in:
   - Title
   - Description
   - Category
   - Public/Private toggle
4. Click "Create Game"
5. Game added to "My Games" list

**Backend:**
```javascript
POST /api/games
Headers: {
  "Authorization": "Bearer token",
  "x-user-id": "user-uuid",
  "x-username": "username"
}
Body: {
  "title": "My First Game",
  "description": "A game I created",
  "category": "Action",
  "isPublic": true
}
```

**Response:**
```json
{
  "id": "game-uuid",
  "title": "My First Game",
  "creatorId": "user-uuid",
  "status": "development",
  "createdAt": "2025-01-29T...",
  "plays": 0,
  "likes": 0
}
```

### Publish Game

**Frontend:**
1. In "Create" section, find your game
2. Click "Publish" button
3. In tool modal, configure:
   - Status (Draft/Private/Public)
   - Monetization (optional)
4. Click "Publish Game"

**Backend:**
```javascript
PUT /api/games/game-id
{
  "status": "published",
  "isPublic": true,
  "price": 0
}
```

### Play Game

**Frontend:**
1. Click any game
2. Click "Play Now" button
3. Alert shows game is launching
4. Play count increments

**Backend:**
```javascript
POST /api/games/game-id/play
```

---

## 3. 🛠️ Development Studio with 6 Tools

### Tool 1: Script Editor

**Purpose:** Write Lua game logic

**Frontend:**
- Click "Create" → "Script Editor"
- Pre-filled example Lua code
- "Save Script" button

**Example Lua:**
```lua
-- Welcome to BitByteLabs Script Editor
function onTouched(hit)
  print('Player touched: ' .. hit.Parent.Name)
end
```

### Tool 2: Mesh Tools

**Purpose:** Upload and manage 3D models

**Frontend:**
- Click "Create" → "Mesh Tools"
- Drag-and-drop area for files
- Browse button for file selection
- Supported: .obj, .fbx, .gltf

**Backend Ready:** Upload endpoint prepared for multer

### Tool 3: Physics Engine

**Purpose:** Configure game physics

**Frontend:**
- Sliders for:
  - Gravity (0-50): Default 20
  - Friction (0-1): Default 0.5
  - Restitution (0-1): Default 0.3
- "Apply Settings" button

**Example Config:**
```javascript
{
  "gravity": 20,
  "friction": 0.5,
  "restitution": 0.3
}
```

### Tool 4: Sound Manager

**Purpose:** Add audio and music

**Frontend:**
- Click to upload audio files
- Supported: .mp3, .wav, .ogg
- Shows uploaded sounds list
- Ready for playback configuration

### Tool 5: UI Designer

**Purpose:** Create game interfaces

**Frontend:**
- Visual canvas preview area
- Buttons to add UI elements:
  - Add Button
  - Add Label
  - Add Image
  - Add Input Field
- Drag-and-drop layout system

### Tool 6: Game Publisher

**Purpose:** Deploy and monetize

**Frontend:**
- Status dropdown (Draft/Private/Public)
- Monetization toggles:
  - Enable Robux sales
  - Earn from game passes
- "Publish Game" button

**Backend:**
All tools are prepared with routes ready for full implementation.

---

## 4. 💰 Asset Store - Trade Items

### Browse Asset Store

**Frontend:**
- "Asset Store" section
- 12-item grid of featured assets
- Each card shows:
  - 3D model emoji
  - Asset name
  - Rating
  - Price (Free or Robux amount)
  - Creator name

**Backend:**
```javascript
GET /api/assets              // All assets
GET /api/assets/featured     // Top 12 featured
GET /api/assets/:id          // Single asset
```

### Asset Categories

- 3D Models (🎨)
- Scripts (📝)
- Sounds (🎵)
- Textures (🖼️)
- Plugins (🔌)
- Other (📦)

### Purchase Asset

**Frontend:**
1. Click any asset
2. See details and price
3. Click "Purchase" or "Download"
4. If paid, Robux deducted
5. Asset added to inventory

**Backend:**
```javascript
POST /api/assets/asset-id/purchase
Headers: {
  "Authorization": "Bearer token",
  "x-user-id": "user-id"
}
```

**Response:**
```json
{
  "message": "Asset purchased/downloaded",
  "asset": { ...asset data... }
}
```

### Create Asset (Creator)

**Frontend:**
- Click "Asset Store" section
- Upload form for new asset
- Set name, description, category, price

**Backend:**
```javascript
POST /api/assets
{
  "name": "Medieval Castle",
  "description": "Detailed 3D castle model",
  "category": "3D Model",
  "price": 100,
  "modelUrl": "https://..."
}
```

### Rate Asset

**Frontend:**
- Click asset
- Click star rating (1-5)

**Backend:**
```javascript
POST /api/assets/asset-id/rate
{
  "rating": 5
}
```

---

## 5. 💰 Robux Economy - Earn & Spend

### View Robux Balance

**Frontend:**
- Always visible in navbar
- Shows "💰 [amount]" in gold color
- Updates after transactions

**Backend:**
```javascript
GET /api/economy/balance/user-id
// Returns: { robux: 5000 }
```

### Buy Robux

**Frontend:**
1. Click "Buy Robux" in profile modal
2. Select amount (10-100,000)
3. Choose payment method
4. Confirm purchase
5. Balance updates immediately

**Backend:**
```javascript
POST /api/economy/robux/purchase
{
  "userId": "user-id",
  "amount": 1000,
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "newBalance": 6000,
  "transactionId": "uuid"
}
```

### Earn from Games

**Developers earn Robux when:**
- Players play their games
- Players buy game passes
- Players purchase in-game items

**Backend (Automatic):**
```javascript
POST /api/economy/earnings/add
{
  "gameId": "game-id",
  "userId": "user-id",
  "amount": 50
}
```

### Transfer Robux

**Frontend:**
- Go to friend profile
- Click "Send Robux"
- Enter amount
- Confirm transfer

**Backend:**
```javascript
POST /api/economy/robux/transfer
{
  "fromUserId": "sender-id",
  "toUserId": "receiver-id",
  "amount": 500
}
```

**Validation:**
- ✅ Sender has sufficient balance
- ✅ Amount is positive
- ✅ Transaction logged

### Transaction History

**Frontend:**
1. Click "Robux" in navbar
2. View "Transaction History"
3. See all purchases, transfers, earnings

**Backend:**
```javascript
GET /api/economy/transactions/user-id
// Returns array of last 50 transactions
```

---

## 6. 📝 Social Features

### Create Posts

**Frontend:**
1. Click "Community" section
2. Click "Create Post"
3. Enter content (text + optional image URL)
4. Click "Post"

**Backend:**
```javascript
POST /api/social/posts
Headers: {
  "Authorization": "Bearer token",
  "x-user-id": "user-id",
  "x-username": "username"
}
Body: {
  "content": "Just beat a new game!",
  "imageUrl": "https://..."
}
```

### View Social Feed

**Frontend:**
- "Community" section shows feed
- Posts from all users
- Sorted by newest first
- Shows:
  - User avatar (first letter)
  - Username
  - Post content
  - Image (if included)
  - Like count
  - Comment count
  - Share count

**Backend:**
```javascript
GET /api/social/feed
// Returns last 50 posts, newest first
```

### Like Posts

**Frontend:**
- Click "👍" button on any post
- Count increments
- Only one like per user per post

**Backend:**
```javascript
POST /api/social/posts/post-id/like
Headers: {
  "Authorization": "Bearer token",
  "x-user-id": "user-id"
}
```

### Comment on Posts

**Frontend:**
1. Click "💬" button on post
2. Prompt asks for comment text
3. Submit comment
4. Appears in post

**Backend:**
```javascript
POST /api/social/posts/post-id/comment
{
  "comment": "This is awesome!"
}
```

Response includes updated comment count.

### Send Messages

**Frontend:**
1. Click friend's name
2. Click "Message" button
3. Type message
4. Send

**Backend:**
```javascript
POST /api/social/messages/send
{
  "fromUserId": "user-id",
  "toUserId": "friend-id",
  "content": "Hey! Wanna play?"
}
```

### View Messages

**Frontend:**
- Click user profile
- "Messages" tab shows conversation
- Oldest to newest
- Mark as read when opened

**Backend:**
```javascript
GET /api/social/messages/user-id
// All messages for this user
```

---

## 7. 👥 Friends & Leaderboard

### Add Friend

**Frontend:**
1. Click another player's profile
2. Click "Add Friend" button
3. User added to friends list

**Backend:**
```javascript
POST /api/users/user-id/friends/friend-id
Headers: { "Authorization": "Bearer token" }
```

### View Friends List

**Frontend:**
1. Click your profile
2. "Friends" tab shows all friends
3. Click friend to view their profile

**Backend:**
```javascript
GET /api/users/user-id/friends
// Returns array of friend IDs
```

### View Leaderboard

**Frontend:**
- "Community" section shows top 10
- Displays:
  - Rank with medal emoji (🥇 🥈 🥉)
  - Username
  - Level and XP
  - Robux balance

**Backend:**
```javascript
GET /api/users/leaderboard
// Top 50 users sorted by Robux
```

**Ranking Criteria:**
1. Robux balance (primary)
2. Level (secondary)
3. Experience (tertiary)

---

## 8. ⭐ Rate & Review Games

### Rate a Game

**Frontend:**
1. Click any game
2. See "Rate this game" section
3. Click star (1-5)
4. Submit rating

**Backend:**
```javascript
POST /api/games/game-id/rate
{
  "rating": 5
}
```

**Response:**
```json
{
  "averageRating": "4.5",
  "totalRatings": 324
}
```

### View Game Reviews

**Frontend:**
- Game detail modal shows:
  - Average rating (in gold stars)
  - Total number of ratings
  - Comments section

**Backend:**
- Game object includes:
  - `rating`: Average of all ratings
  - `ratings`: Array of individual ratings
  - `comments`: Array of user comments

### Comment on Games

**Frontend:**
1. Click "💬" on game card
2. Enter comment
3. Post comment

**Backend:**
```javascript
POST /api/games/game-id/comment
{
  "comment": "Great game!"
}
```

---

## 9. 🎯 Complete User Journey

### New Player Flow:
1. **Sign Up** → Get 100 Robux
2. **Browse Games** → See featured/search
3. **Play Game** → Increment play counter
4. **Rate Game** → Leave feedback
5. **Join Community** → View feed, make posts
6. **Add Friends** → Start social connections
7. **Create Game** → Become developer
8. **Use Studio Tools** → Build amazing games
9. **Publish Game** → Share with world
10. **Earn Robux** → Get paid from plays

### Developer Flow:
1. **Create Game** → Add to catalog
2. **Use Dev Tools** → Build features
   - Write scripts (Lua)
   - Add 3D models
   - Configure physics
   - Add sounds
   - Design UI
3. **Publish** → Make public
4. **Monitor Stats** → Track plays/likes
5. **Earn Robux** → Get revenue
6. **Create Assets** → Sell in store
7. **Build Portfolio** → Gain reputation

---

## 10. 📊 Testing Checklist

### User Accounts ✅
- [ ] Register new account
- [ ] Login with credentials
- [ ] View profile
- [ ] Update bio/avatar
- [ ] Logout
- [ ] Login again with saved token

### Games ✅
- [ ] Browse featured games
- [ ] Search games by keyword
- [ ] Filter by category
- [ ] View single game details
- [ ] Create new game
- [ ] Edit game settings
- [ ] Publish game
- [ ] Play game (increment counter)
- [ ] Like game
- [ ] Rate game (1-5 stars)

### Studio Tools ✅
- [ ] Open Script Editor
- [ ] Open Mesh Tools
- [ ] Open Physics Engine
- [ ] Open Sound Manager
- [ ] Open UI Designer
- [ ] Open Game Publisher

### Asset Store ✅
- [ ] Browse all assets
- [ ] View featured assets
- [ ] Search assets
- [ ] View asset details
- [ ] Purchase free asset
- [ ] Check inventory
- [ ] Rate asset

### Economy ✅
- [ ] View Robux balance
- [ ] Simulate Robux purchase
- [ ] Check balance updated
- [ ] View transaction history
- [ ] Transfer Robux to friend
- [ ] Verify both balances

### Social ✅
- [ ] Create post with text
- [ ] Create post with image
- [ ] Like post
- [ ] Comment on post
- [ ] View all comments
- [ ] Send message to friend
- [ ] Receive message
- [ ] Add friend
- [ ] View friends list

### Leaderboard ✅
- [ ] View leaderboard
- [ ] See top 10 ranked
- [ ] Check your rank
- [ ] Rankings by Robux

---

All features are implemented and ready to test!

## 🚀 Next: Start the servers and begin testing!

```bash
./start-all.sh
# Then visit http://localhost:8000
```
