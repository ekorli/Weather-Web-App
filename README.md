# Weather App

A full-stack weather application built with React and Node.js that displays current weather conditions and 24-hour forecasts for any location.

## Features

- 🌍 Search weather by location (city, country)
- 🌡️ Current weather conditions (temperature, wind speed, humidity, etc.)
- 📊 24-hour weather forecast
- 🔄 Refresh weather data
- 📍 Automatic user location detection
- 🎨 Smooth animations with Framer Motion
- 📱 Responsive design

## Technologies Used

### Frontend
- React with TypeScript
- Framer Motion (animations)
- Lucide React (icons)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- Visual Crossing Weather API
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Visual Crossing Weather API key (free at https://www.visualcrossing.com/weather-api)

## Installation

1. Clone or navigate to the project directory
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Add your Visual Crossing Weather API key to the `.env` file

## Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```
The server will start on http://localhost:5000

### Start the Frontend (in a new terminal)
```bash
cd frontend
npm start
```
The app will open in your browser at http://localhost:3000

## API Endpoints

- `GET /api/weather/:location` - Get weather data for a specific location
- `GET /api/location` - Get user's current location based on IP
- `GET /api/health` - Health check endpoint

## Project Structure

```
Weather App/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main App component
│   └── package.json       # Frontend dependencies
└── README.md
```

## Contributing

Feel free to submit issues and enhancement requests!
