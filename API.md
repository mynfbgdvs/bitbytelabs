# BitByteLabs API Documentation & Examples

Complete API reference with code examples for all BitByteLabs endpoints.

## 🔐 Authentication

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "player123",
  "email": "player@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-here",
    "username": "player123",
    "email": "player@example.com",
    "robux": 100,
    "level": 1
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "player@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-here",
    "username": "player123",
    "email": "player@example.com",
    "robux": 100,
    "level": 1,
    "avatar": "default-avatar.png"
  }
}
```

### Verify Token
```bash
GET /api/auth/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "id": "uuid-here",
    "username": "player123"
  }
}
```

---

## 🎮 Games API

### Get All Games
```bash
GET /api/games
```

**Response:**
```json
[
  {
    "id": "game-uuid",
    "title": "Sword Fight Arena",
    "description": "Epic 1v1 sword fighting",
    "category": "Action",
    "creatorName": "DevMaster",
    "isPublic": true,
    "thumbnail": "https://...",
    "plays": 15000,
    "likes": 2500,
    "rating": "4.5",
    "status": "published",
    "createdAt": "2025-01-29T10:00:00Z"
  }
]
```

### Get Featured Games
```bash
GET /api/games/featured
```

Returns top 8 games sorted by number of plays.

### Get Single Game
```bash
GET /api/games/game-id
```

### Create Game
```bash
POST /api/games
Content-Type: application/json
Authorization: Bearer token-here
x-user-id: user-id
x-username: username

{
  "title": "My Awesome Game",
  "description": "An amazing game where you can do awesome things",
  "category": "Adventure",
  "isPublic": true
}
```

### Update Game
```bash
PUT /api/games/game-id
Content-Type: application/json
Authorization: Bearer token-here

{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "published",
  "price": 50
}
```

### Delete Game
```bash
DELETE /api/games/game-id
Authorization: Bearer token-here
```

### Play Game (Increment Counter)
```bash
POST /api/games/game-id/play
Authorization: Bearer token-here
```

### Like Game
```bash
POST /api/games/game-id/like
Authorization: Bearer token-here
```

### Rate Game
```bash
POST /api/games/game-id/rate
Content-Type: application/json
Authorization: Bearer token-here

{
  "rating": 5
}
```

Valid ratings: 1-5

### Search Games
```bash
GET /api/games/search?q=adventure&category=Adventure
```

---

## 👥 Users API

### Get User Profile
```bash
GET /api/users/user-id
```

**Response:**
```json
{
  "id": "user-id",
  "username": "player123",
  "email": "player@example.com",
  "level": 5,
  "experience": 4500,
  "robux": 5000,
  "avatar": "avatar-url",
  "bio": "Game lover and creator",
  "createdAt": "2025-01-01T00:00:00Z",
  "friendsList": ["friend-id-1", "friend-id-2"]
}
```

### Update Profile
```bash
PUT /api/users/user-id
Content-Type: application/json
Authorization: Bearer token-here

{
  "bio": "Passionate game developer",
  "avatar": "avatar-image-url",
  "displayName": "Pro Player"
}
```

### Get User's Games
```bash
GET /api/users/user-id/games
```

### Get User's Friends
```bash
GET /api/users/user-id/friends
```

### Add Friend
```bash
POST /api/users/user-id/friends/friend-id
Authorization: Bearer token-here
```

### Remove Friend
```bash
DELETE /api/users/user-id/friends/friend-id
Authorization: Bearer token-here
```

### Get Leaderboard
```bash
GET /api/users/leaderboard
```

**Response:**
```json
[
  {
    "rank": 1,
    "username": "TopPlayer",
    "robux": 50000,
    "level": 50,
    "experience": 500000
  }
]
```

---

## 📦 Assets API

### Get All Assets
```bash
GET /api/assets
```

### Get Asset Details
```bash
GET /api/assets/asset-id
```

**Response:**
```json
{
  "id": "asset-id",
  "name": "Medieval Castle",
  "description": "Detailed medieval castle model",
  "category": "3D Model",
  "price": 0,
  "thumbnail": "https://...",
  "creatorName": "BuildMaster",
  "downloads": 12500,
  "rating": 4.8,
  "createdAt": "2025-01-15T00:00:00Z"
}
```

### Create Asset
```bash
POST /api/assets
Content-Type: application/json
Authorization: Bearer token-here
x-user-id: user-id
x-username: username

{
  "name": "Sci-Fi Spaceship",
  "description": "Futuristic spaceship model",
  "category": "3D Model",
  "price": 100,
  "modelUrl": "https://model-storage.com/spaceship.obj"
}
```

### Purchase Asset
```bash
POST /api/assets/asset-id/purchase
Authorization: Bearer token-here
x-user-id: user-id
```

### Rate Asset
```bash
POST /api/assets/asset-id/rate
Content-Type: application/json
Authorization: Bearer token-here

{
  "rating": 5
}
```

### Get Featured Assets
```bash
GET /api/assets/featured
```

---

## 💰 Economy API

### Get Robux Balance
```bash
GET /api/economy/balance/user-id
```

**Response:**
```json
{
  "userId": "user-id",
  "robux": 5000,
  "lastUpdated": "2025-01-29T12:00:00Z"
}
```

### Purchase Robux
```bash
POST /api/economy/robux/purchase
Content-Type: application/json
Authorization: Bearer token-here

{
  "userId": "user-id",
  "amount": 1000,
  "paymentMethod": "credit_card"
}
```

### Transfer Robux
```bash
POST /api/economy/robux/transfer
Content-Type: application/json
Authorization: Bearer token-here

{
  "fromUserId": "sender-id",
  "toUserId": "receiver-id",
  "amount": 500
}
```

### Add Earnings (Game)
```bash
POST /api/economy/earnings/add
Content-Type: application/json
Authorization: Bearer token-here

{
  "gameId": "game-id",
  "userId": "user-id",
  "amount": 100
}
```

### Get Transaction History
```bash
GET /api/economy/transactions/user-id
Authorization: Bearer token-here
```

### List Item for Sale
```bash
POST /api/economy/marketplace/list
Content-Type: application/json
Authorization: Bearer token-here

{
  "userId": "user-id",
  "itemId": "item-id",
  "itemType": "asset",
  "price": 500
}
```

---

## 🤝 Social API

### Create Post
```bash
POST /api/social/posts
Content-Type: application/json
Authorization: Bearer token-here
x-user-id: user-id
x-username: username

{
  "userId": "user-id",
  "content": "Just published my new game! Check it out!",
  "imageUrl": "https://image-url.com/game.jpg"
}
```

### Get Social Feed
```bash
GET /api/social/feed
```

**Response:**
```json
[
  {
    "id": "post-id",
    "userId": "user-id",
    "username": "player123",
    "content": "Just beat a new game!",
    "imageUrl": null,
    "likes": 125,
    "comments": [
      {
        "id": "comment-id",
        "username": "friend1",
        "text": "Nice one!",
        "likes": 5
      }
    ],
    "shares": 10,
    "createdAt": "2025-01-29T10:00:00Z"
  }
]
```

### Get User Posts
```bash
GET /api/social/user/user-id/posts
```

### Like Post
```bash
POST /api/social/posts/post-id/like
Authorization: Bearer token-here
x-user-id: user-id
```

### Comment on Post
```bash
POST /api/social/posts/post-id/comment
Content-Type: application/json
Authorization: Bearer token-here
x-user-id: user-id
x-username: username

{
  "comment": "This is an awesome game!"
}
```

### Send Message
```bash
POST /api/social/messages/send
Content-Type: application/json
Authorization: Bearer token-here

{
  "fromUserId": "sender-id",
  "toUserId": "receiver-id",
  "content": "Hey! Wanna play a game?"
}
```

### Get Messages
```bash
GET /api/social/messages/user-id
Authorization: Bearer token-here
```

### Mark Message as Read
```bash
PUT /api/social/messages/message-id/read
Authorization: Bearer token-here
```

---

## 🧪 Testing with cURL

### Example 1: Register and Login
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Example 2: Create a Game
```bash
curl -X POST http://localhost:5000/api/games \
  -H "Content-Type: application/json" \
  -H "x-user-id: user-123" \
  -H "x-username: testuser" \
  -d '{
    "title": "My First Game",
    "description": "A test game",
    "category": "Action",
    "isPublic": true
  }'
```

### Example 3: Get All Games
```bash
curl http://localhost:5000/api/games | json_pp
```

### Example 4: Like a Game
```bash
curl -X POST http://localhost:5000/api/games/game-id/like \
  -H "Authorization: Bearer your-token-here"
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict (e.g., user already exists) |
| 500 | Server Error |

---

## 🔒 Authentication Headers

All protected endpoints require:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Custom headers for context:
```
x-user-id: user-uuid
x-username: username
```

---

## 💡 Tips

1. **Always include Content-Type header**: `application/json`
2. **Save your token**: Store after login for authenticated requests
3. **Test with Postman**: Import these examples into Postman
4. **Check error messages**: They'll help debug issues
5. **Read timestamps**: All dates are in ISO 8601 format

---

## 🧩 Frontend Integration Example

```javascript
// Fetch games from API
async function fetchGames() {
  try {
    const response = await fetch('http://localhost:5000/api/games');
    const games = await response.json();
    displayGames(games);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

// Create a game
async function createGame(title, description, category) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  const response = await fetch('http://localhost:5000/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-user-id': userId,
      'x-username': localStorage.getItem('username')
    },
    body: JSON.stringify({ title, description, category, isPublic: true })
  });
  
  return await response.json();
}
```

---

Complete API documentation for BitByteLabs! 🚀
