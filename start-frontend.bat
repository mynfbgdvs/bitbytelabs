@echo off
REM BitByteLabs Frontend Server for Windows

echo.
echo 🎮 BitByteLabs Gaming Platform - Frontend Server
echo ================================================
echo.

cd frontend

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    where python3 >nul 2>nul
    if %errorlevel% neq 0 (
        echo ❌ Python is not installed
        echo Please install Python or use another HTTP server:
        echo   - npx http-server
        echo   - npx live-server
        exit /b 1
    )
    set PYTHON=python3
) else (
    set PYTHON=python
)

echo 🚀 Starting frontend server on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

%PYTHON% -m http.server 8000
