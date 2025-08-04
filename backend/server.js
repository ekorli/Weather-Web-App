const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Visual Crossing Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Demo data for testing without API key
const getDemoWeatherData = (location) => {
  const currentHour = new Date().getHours();
  const demoData = {
    location: location || 'Demo City, Demo Country',
    current: {
      temperature: Math.round(15 + Math.random() * 15),
      windSpeed: Math.round(5 + Math.random() * 20),
      precipProb: Math.round(Math.random() * 100),
      conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      icon: 'partly-cloudy-day',
      humidity: Math.round(40 + Math.random() * 40),
      visibility: Math.round(5 + Math.random() * 15),
      uvIndex: Math.round(Math.random() * 10),
      datetime: new Date().toISOString()
    },
    hourly: []
  };

  // Generate 24 hours of demo data
  for (let i = -12; i < 12; i++) {
    const hour = (currentHour + i + 24) % 24;
    demoData.hourly.push({
      datetime: String(hour).padStart(2, '0') + ':00:00',
      temperature: Math.round(10 + Math.random() * 20),
      windSpeed: Math.round(3 + Math.random() * 15),
      precipProb: Math.round(Math.random() * 60),
      conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      icon: hour < 6 || hour > 18 ? 'clear-night' : 'clear-day',
      isPast: i < 0
    });
  }

  return demoData;
};

// Weather endpoint
app.get('/api/weather/:location', async (req, res) => {
  try {
    const { location } = req.params;
    
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_api_key_here') {
      console.log('Using demo mode - no valid API key provided');
      return res.json(getDemoWeatherData(location));
    }

    // Fetch weather data from Visual Crossing API
    const response = await axios.get(
      `${WEATHER_BASE_URL}/${encodeURIComponent(location)}`,
      {
        params: {
          key: WEATHER_API_KEY,
          unitGroup: 'metric',
          include: 'hours,current',
          iconSet: 'icons2',
          contentType: 'json'
        }
      }
    );

    const weatherData = response.data;
    
    // Extract current weather
    const currentConditions = weatherData.currentConditions;
    
    // Extract hourly data for 24 hours (past 12 hours + next 12 hours)
    const today = weatherData.days[0];
    const tomorrow = weatherData.days[1];
    
    // Get current hour index
    const currentHour = new Date().getHours();
    
    // Get past 12 hours from today
    const pastHours = today.hours.slice(Math.max(0, currentHour - 12), currentHour);
    
    // Get remaining hours from today + hours from tomorrow to make 24 total
    const remainingTodayHours = today.hours.slice(currentHour);
    const tomorrowHours = tomorrow ? tomorrow.hours : [];
    const futureHours = [...remainingTodayHours, ...tomorrowHours].slice(0, 24 - pastHours.length);
    
    const hourlyData = [...pastHours, ...futureHours];

    // Format response
    const formattedData = {
      location: weatherData.resolvedAddress,
      current: {
        temperature: Math.round(currentConditions.temp),
        windSpeed: currentConditions.windspeed,
        precipProb: currentConditions.precipprob || 0,
        conditions: currentConditions.conditions,
        icon: currentConditions.icon,
        humidity: currentConditions.humidity,
        visibility: currentConditions.visibility,
        uvIndex: currentConditions.uvindex,
        datetime: currentConditions.datetime
      },
      hourly: hourlyData.map((hour, index) => ({
        datetime: hour.datetime,
        temperature: Math.round(hour.temp),
        windSpeed: hour.windspeed,
        precipProb: hour.precipprob || 0,
        conditions: hour.conditions,
        icon: hour.icon,
        isPast: index < pastHours.length
      }))
    };

    res.json(formattedData);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      res.status(400).json({ error: 'Invalid location. Please check the location and try again.' });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API key' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

// Get user's location based on IP
app.get('/api/location', async (req, res) => {
  try {
    // Using a free IP geolocation service
    const response = await axios.get('http://ip-api.com/json/');
    const locationData = response.data;
    
    if (locationData.status === 'success') {
      res.json({
        city: locationData.city,
        country: locationData.country,
        lat: locationData.lat,
        lon: locationData.lon
      });
    } else {
      // Return demo location if geolocation fails
      res.json({
        city: 'London',
        country: 'United Kingdom',
        lat: 51.5074,
        lon: -0.1278
      });
    }
  } catch (error) {
    console.error('Location API Error:', error.message);
    // Return demo location if geolocation fails
    res.json({
      city: 'London',
      country: 'United Kingdom',
      lat: 51.5074,
      lon: -0.1278
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
