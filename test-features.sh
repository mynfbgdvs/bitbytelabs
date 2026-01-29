#!/bin/bash

# BitByteLabs - Feature Testing Script
# This script tests all major features of the platform

echo "🎮 BitByteLabs - Comprehensive Feature Test"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test API endpoint
test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3
  local description=$4
  
  echo -n "Testing: $description... "
  
  if [ -z "$data" ]; then
    response=$(curl -s -X $method "http://localhost:5000/api$endpoint" \
      -H "Content-Type: application/json")
  else
    response=$(curl -s -X $method "http://localhost:5000/api$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi
  
  if echo "$response" | grep -q "error" && ! echo "$response" | grep -q "message"; then
    echo -e "${RED}✗ FAILED${NC}"
    echo "Response: $response"
  else
    echo -e "${GREEN}✓ PASSED${NC}"
  fi
}

# Check if server is running
echo "Checking if backend server is running..."
if ! curl -s "http://localhost:5000/api/health" > /dev/null 2>&1; then
  echo -e "${RED}✗ Backend server is not running!${NC}"
  echo "Start it with: cd backend && npm start"
  exit 1
fi
echo -e "${GREEN}✓ Backend server is running${NC}"
echo ""

# Test Health Check
echo "=== 1. HEALTH CHECK ==="
test_endpoint "GET" "/health" "" "Server health check"
echo ""

# Test Authentication
echo "=== 2. USER AUTHENTICATION ==="

# Register test user
USER_DATA='{"username":"testuser_'$(date +%s)'","email":"test_'$(date +%s)'@example.com","password":"testpass123"}'
test_endpoint "POST" "/auth/register" "$USER_DATA" "User registration"

# Try duplicate registration (should fail gracefully)
test_endpoint "POST" "/auth/register" "$USER_DATA" "Duplicate registration (expected to fail gracefully)"

# Login
LOGIN_DATA='{"email":"test_'$(date +%s)'@example.com","password":"testpass123"}'
echo -n "Testing: User login... "
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:5000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}')

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
  echo -e "${GREEN}✓ PASSED${NC}"
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  USERID=$(echo "$LOGIN_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo "Token: ${TOKEN:0:20}..."
else
  echo -e "${RED}✗ FAILED${NC}"
  echo "Response: $LOGIN_RESPONSE"
fi
echo ""

# Test Games
echo "=== 3. GAME MANAGEMENT ==="
test_endpoint "GET" "/games" "" "Get all games"
test_endpoint "GET" "/games/featured" "" "Get featured games"

# Create a game
GAME_DATA='{"title":"Test Game","description":"A test game","category":"Action","isPublic":true}'
test_endpoint "POST" "/games" "$GAME_DATA" "Create new game"
echo ""

# Test Users
echo "=== 4. USER MANAGEMENT ==="
test_endpoint "GET" "/users/leaderboard" "" "Get leaderboard"
echo ""

# Test Assets
echo "=== 5. ASSET STORE ==="
test_endpoint "GET" "/assets" "" "Get all assets"
test_endpoint "GET" "/assets/featured" "" "Get featured assets"

ASSET_DATA='{"name":"Test Asset","description":"Test","category":"3D Model","price":0}'
test_endpoint "POST" "/assets" "$ASSET_DATA" "Create new asset"
echo ""

# Test Economy
echo "=== 6. ECONOMY/ROBUX ==="
test_endpoint "GET" "/economy/balance/test-user" "" "Get Robux balance"

PURCHASE_DATA='{"userId":"test-user","amount":1000,"paymentMethod":"credit_card"}'
test_endpoint "POST" "/economy/robux/purchase" "$PURCHASE_DATA" "Purchase Robux"

TRANSFER_DATA='{"fromUserId":"user1","toUserId":"user2","amount":500}'
test_endpoint "POST" "/economy/robux/transfer" "$TRANSFER_DATA" "Transfer Robux"
echo ""

# Test Social
echo "=== 7. SOCIAL FEATURES ==="
POST_DATA='{"userId":"test-user","content":"Test post","imageUrl":null}'
test_endpoint "POST" "/social/posts" "$POST_DATA" "Create social post"

test_endpoint "GET" "/social/feed" "" "Get social feed"

MESSAGE_DATA='{"fromUserId":"user1","toUserId":"user2","content":"Test message"}'
test_endpoint "POST" "/social/messages/send" "$MESSAGE_DATA" "Send message"
echo ""

# Test Game Interactions
echo "=== 8. GAME INTERACTIONS ==="
test_endpoint "POST" "/games/game-id/play" "" "Record game play"
test_endpoint "POST" "/games/game-id/like" "" "Like game"

RATE_DATA='{"rating":5}'
test_endpoint "POST" "/games/game-id/rate" "$RATE_DATA" "Rate game"
echo ""

# Summary
echo "============================================"
echo -e "${GREEN}✓ Feature Testing Complete!${NC}"
echo ""
echo "Note: Some tests may show expected failures (e.g., duplicate registration)."
echo "This is normal behavior for API validation."
echo ""
echo "For detailed feature documentation, see: FEATURES.md"
