@echo off
REM BitByteLabs Quick Start Script for Windows

echo.
echo 🎮 BitByteLabs Gaming Platform - Quick Start
echo =============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)

echo ✅ Backend dependencies installed
echo.
echo 🚀 Starting BitByteLabs Backend Server...
echo Server will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the backend server
call npm start
