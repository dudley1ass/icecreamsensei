@echo off
echo ========================================
echo Ice Cream Mix Calculator - Starting...
echo ========================================
echo.

REM Change to project directory
cd /d "D:\Winton Engineering\Ice Cream\Frontend"

echo Current directory: %CD%
echo.

REM Check if vite is installed by trying to run it
call npm list vite >nul 2>&1
if errorlevel 1 (
    echo Dependencies are missing or incomplete.
    echo Installing/updating dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed!
        echo.
        echo Please try these steps:
        echo 1. Make sure Node.js is installed from https://nodejs.org/
        echo 2. Delete the node_modules folder
        echo 3. Run this batch file again
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
)

echo Starting development server...
echo.
echo ========================================
echo The app will open in your browser at:
echo http://localhost:5173
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

REM Open browser after a short delay (in background)
start "" timeout /t 3 /nobreak >nul 2>&1 ^& start http://localhost:5174

REM Start the development server
call npm run dev

pause