#!/bin/bash
# BitByteLabs - Interactive Feature Verification Tool
# Tests all 46 features with interactive checklist

clear
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🎮 BitByteLabs Feature Verification Tool - Interactive v1.0 🎮 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Prerequisites:"
echo "  ✓ Backend: npm start (in backend/)"
echo "  ✓ Frontend: python3 -m http.server 8000 (in frontend/)"
echo "  ✓ Browser: http://localhost:8000"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TOTAL=46
PASSED=0

test_feature() {
  local num=$1
  local cat=$2
  local feat=$3
  
  echo ""
  echo -e "${BLUE}[$num/$TOTAL]${NC} $cat - $feat"
  echo -n "Pass? (y/n/s): "
  read -r ans
  
  if [ "$ans" = "y" ]; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
  elif [ "$ans" = "s" ]; then
    echo -e "${YELLOW}⊘ SKIPPED${NC}"
  else
    echo -e "${RED}✗ FAILED${NC}"
  fi
}

# USER ACCOUNTS (7)
echo -e "${YELLOW}════════ 1. USER ACCOUNTS (7 tests) ════════${NC}"
test_feature 1 "Account" "User Registration"
test_feature 2 "Account" "User Login"
test_feature 3 "Account" "Profile Viewing"
test_feature 4 "Account" "Profile Editing"
test_feature 5 "Account" "Friend Management"
test_feature 6 "Account" "Logout"
test_feature 7 "Account" "Session Persistence"

# GAMES (9)
echo -e "${YELLOW}════════ 2. GAMES (9 tests) ════════${NC}"
test_feature 8 "Games" "Browse All Games"
test_feature 9 "Games" "Search Games"
test_feature 10 "Games" "Filter by Category"
test_feature 11 "Games" "View Game Details"
test_feature 12 "Games" "Play Game"
test_feature 13 "Games" "Create Game"
test_feature 14 "Games" "Publish Game"
test_feature 15 "Games" "Like Game"
test_feature 16 "Games" "Rate Game"

# STUDIO (6)
echo -e "${YELLOW}════════ 3. STUDIO (6 tests) ════════${NC}"
test_feature 17 "Studio" "Access Studio"
test_feature 18 "Studio" "Script Editor"
test_feature 19 "Studio" "Mesh Editor"
test_feature 20 "Studio" "Physics Tool"
test_feature 21 "Studio" "Sound Manager"
test_feature 22 "Studio" "Game Publisher"

# ASSETS (7)
echo -e "${YELLOW}════════ 4. ASSET STORE (7 tests) ════════${NC}"
test_feature 23 "Assets" "Browse Assets"
test_feature 24 "Assets" "Search Assets"
test_feature 25 "Assets" "Filter Assets"
test_feature 26 "Assets" "View Asset Details"
test_feature 27 "Assets" "Purchase Asset"
test_feature 28 "Assets" "Use Free Asset"
test_feature 29 "Assets" "Rate Asset"

# ECONOMY (6)
echo -e "${YELLOW}════════ 5. ECONOMY (6 tests) ════════${NC}"
test_feature 30 "Economy" "Check Robux Balance"
test_feature 31 "Economy" "Purchase Robux"
test_feature 32 "Economy" "Game Sales Earnings"
test_feature 33 "Economy" "Transfer Robux"
test_feature 34 "Economy" "Transaction History"
test_feature 35 "Economy" "Spend Robux"

# SOCIAL (8)
echo -e "${YELLOW}════════ 6. SOCIAL (8 tests) ════════${NC}"
test_feature 36 "Social" "Create Post"
test_feature 37 "Social" "View Feed"
test_feature 38 "Social" "Like Post"
test_feature 39 "Social" "Comment on Post"
test_feature 40 "Social" "Delete Post"
test_feature 41 "Social" "Follow User"
test_feature 42 "Social" "Send Message"
test_feature 43 "Social" "View Messages"

# LEADERBOARD (3)
echo -e "${YELLOW}════════ 7. LEADERBOARD (3 tests) ════════${NC}"
test_feature 44 "Leaderboard" "View Global Leaderboard"
test_feature 45 "Leaderboard" "Filter by Metric"
test_feature 46 "Leaderboard" "Search Player"

# RESULTS
PCT=$((PASSED * 100 / TOTAL))
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║ RESULTS: $PASSED / $TOTAL PASSED ($PCT%)${NC}                                         ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ $PCT -eq 100 ]; then
  echo -e "${GREEN}✓ ALL FEATURES WORKING! Ready for deployment! 🚀${NC}"
elif [ $PCT -ge 90 ]; then
  echo -e "${YELLOW}MOSTLY WORKING - Few issues to fix${NC}"
elif [ $PCT -ge 70 ]; then
  echo -e "${YELLOW}PARTIAL - Significant issues to resolve${NC}"
else
  echo -e "${RED}MAJOR ISSUES - Please review failures${NC}"
fi

echo ""
echo "See TESTING.md for detailed descriptions and troubleshooting!"
echo ""
