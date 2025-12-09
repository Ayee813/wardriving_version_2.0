# Wardriving Game - Setup Instructions

## Changes Made

### 1. Game Flow Updates
- **WardrivingGamePage.tsx**: 
  - After completing the game, players are now automatically navigated to the map page (`/map`)
  - Players no longer see the results screen after finishing the game
  - Game results are saved to `result.json` via backend API

### 2. Route Changes
- **GameDashboardPage**: Route changed from `/game/leaderboard` to `/game_dashboard`
  - Access the dashboard at: `http://localhost:5173/game_dashboard`

### 3. Backend API
- Created `server.js` - Express server to handle game results
- API Endpoints:
  - `POST http://localhost:3001/api/save-result` - Save game result to result.json
  - `GET http://localhost:3001/api/results` - Get all game results

### 4. Data Storage
- Results are saved to `public/json/result.json`
- Backup storage in localStorage for offline functionality

## Installation

1. Install dependencies:
```bash
npm install
```

This will install the new dependencies:
- `express` - Backend server
- `cors` - CORS middleware
- `concurrently` - Run multiple commands simultaneously

## Running the Application

### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev:all
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend API: http://localhost:3001

### Option 2: Run Separately

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

## Usage

1. **Play the Game**: Navigate to `http://localhost:5173/game`
2. **After Completing**: You'll be automatically redirected to the map page
3. **View Dashboard**: Go to `http://localhost:5173/game_dashboard` to see all player results

## File Structure

```
wardriving_version_2.0/
├── server.js                          # Backend API server
├── public/
│   └── json/
│       └── result.json               # Game results database
├── src/
│   ├── pages/
│   │   ├── WardrivingGamePage.tsx   # Game page (saves to API)
│   │   ├── MapPage.tsx              # Redirect destination after game
│   │   └── admin/
│   │       └── GameDashboardPage.tsx # Dashboard (reads from API)
│   └── main.tsx                      # Updated routes
└── package.json                      # Updated with new scripts
```

## Notes

- The backend server must be running for results to be saved to `result.json`
- If the backend is not available, results will still be saved to localStorage as a fallback
- The GameDashboardPage will try to fetch from the API first, then fall back to localStorage
