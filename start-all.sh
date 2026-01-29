#!/bin/bash

# BitByteLabs Full Stack Startup Script

echo "🎮 BitByteLabs Gaming Platform - Full Stack"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --silent
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..
echo ""
echo "🚀 Starting BitByteLabs Servers..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT

# Start backend in background
echo "🔧 Starting Backend Server on http://localhost:5000"
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend in background
echo "🌐 Starting Frontend Server on http://localhost:8000"
cd frontend
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000 > ../frontend.log 2>&1 &
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000 > ../frontend.log 2>&1 &
else
    echo "❌ Python not found. Using Node.js http-server instead..."
    npx http-server -p 8000 > ../frontend.log 2>&1 &
fi
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are running!"
echo ""
echo "Frontend:  http://localhost:8000"
echo "Backend:   http://localhost:5000"
echo ""
echo "Open http://localhost:8000 in your browser to start using BitByteLabs!"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for servers
wait
