#!/bin/bash

# BitByteLabs Quick Start Script

echo "🎮 BitByteLabs Gaming Platform - Quick Start"
echo "=============================================="
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
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "🚀 Starting BitByteLabs Backend Server..."
echo "Server will run on http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the backend server
npm start
