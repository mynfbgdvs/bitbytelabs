#!/bin/bash

# BitByteLabs Frontend Server

echo "🎮 BitByteLabs Gaming Platform - Frontend Server"
echo "=================================================="
echo ""

cd frontend

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "🚀 Starting frontend server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Starting frontend server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python is not installed"
    echo "Please install Python or use another HTTP server:"
    echo "  - npx http-server"
    echo "  - npx live-server"
    exit 1
fi
