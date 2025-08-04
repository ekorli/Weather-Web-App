import React, { useEffect, useState } from "react";
import { weatherApi } from "./services/weatherApi";
import { WeatherData } from "./types/weather";
import { SearchInput } from "./components/SearchInput";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyForecast } from "./components/HourlyForecast";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { motion } from "framer-motion";
import { CloudRain, Sun, MapPin } from "lucide-react";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        setLoading(true);
        const locationData = await weatherApi.getCurrentLocation();
        const locationString = `${locationData.city}, ${locationData.country}`;
        setLocation(locationString);
        const weatherResponse = await weatherApi.getWeather(locationString);
        setWeatherData(weatherResponse);
      } catch (err: any) {
        setError(err.message);
        // If can't get current location, set a default
        setLocation("London, UK");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchInitialWeather();
  }, []);

  const handleLocationSubmit = async (newLocation: string) => {
    if (!newLocation.trim()) return;

    try {
      setLoading(true);
      setError("");
      const weatherResponse = await weatherApi.getWeather(newLocation);
      setWeatherData(weatherResponse);
      setLocation(newLocation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (location) {
      handleLocationSubmit(location);
    }
  };

  if (initialLoad) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary bg-gradient">
        <motion.div
          className="text-center bg-white bg-opacity-75 rounded-4 p-5 border border-light shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LoadingSpinner />
          <p className="mt-4 text-dark fs-4 fw-medium">
            Getting your location...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-primary bg-gradient">
      <div className="container py-5">
        {/* Header */}
        <motion.header
          className="text-center mb-5 mx-auto"
          style={{ maxWidth: "700px" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="display-3 fw-bold text-light mb-3 text-shadow">
            Weather App
          </h1>
          <p className="text-light fs-4 mb-4">
            Beautiful weather at your fingertips
          </p>
          <SearchInput
            onLocationSubmit={handleLocationSubmit}
            initialValue={location}
            loading={loading}
          />
        </motion.header>

        {/* Main Content Area */}
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          {/* Error Message */}
          {error && (
            <motion.div
              className="alert alert-danger text-center mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="fw-medium mb-0">{error}</p>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              className="text-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LoadingSpinner />
              <p className="mt-4 text-light fs-4">Loading weather data...</p>
            </motion.div>
          )}

          {/* Weather Content */}
          {weatherData && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5"
            >
              <CurrentWeather
                weatherData={weatherData}
                onRefresh={handleRefresh}
                loading={loading}
              />
              <HourlyForecast hourlyData={weatherData.hourly} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
