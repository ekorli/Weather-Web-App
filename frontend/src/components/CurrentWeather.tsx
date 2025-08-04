import React from "react";
import { WeatherData } from "../types/weather";
import { getWeatherIcon } from "../utils/weatherUtils";
import { RefreshCw, Wind, Droplets, Eye, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  onRefresh: () => void;
  loading: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  onRefresh,
  loading,
}) => {
  const WeatherIcon = getWeatherIcon(weatherData.current.icon);

  return (
    <motion.div
      className="card bg-white bg-opacity-75 border-0 rounded-4 shadow-lg p-4 mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold text-dark mb-1">{weatherData.location}</h2>
          <p className="text-secondary small">
            Last updated:{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <motion.button
          onClick={onRefresh}
          className="btn btn-outline-primary px-3 py-2 rounded-3"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw
            className={`me-1 ${
              loading ? "spinner-border spinner-border-sm" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* Main Weather Display */}
      <div className="text-center mb-4">
        <motion.div
          className="mb-3"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <WeatherIcon
            className="mb-2"
            style={{ width: "100px", height: "100px", color: "#0d6efd" }}
          />
        </motion.div>
        <div className="display-2 fw-bold text-primary mb-2">
          {weatherData.current.temperature}0
        </div>
        <p className="fs-4 text-dark fw-medium">
          {weatherData.current.conditions}
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="row g-3">
        <motion.div
          className="col bg-light bg-opacity-75 rounded-3 p-3 text-center border"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Wind className="w-8 h-8 text-white mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">
            {weatherData.current.windSpeed}
          </div>
          <div className="text-white/80 text-sm">km/h</div>
          <div className="text-white/60 text-xs mt-1">Wind Speed</div>
        </motion.div>

        <motion.div
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/30"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Droplets className="w-8 h-8 text-white mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">
            {weatherData.current.humidity}
          </div>
          <div className="text-white/80 text-sm">%</div>
          <div className="text-white/60 text-xs mt-1">Humidity</div>
        </motion.div>

        <motion.div
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/30"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Eye className="w-8 h-8 text-white mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">
            {weatherData.current.visibility}
          </div>
          <div className="text-white/80 text-sm">km</div>
          <div className="text-white/60 text-xs mt-1">Visibility</div>
        </motion.div>

        <motion.div
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/30"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">
            {weatherData.current.uvIndex}
          </div>
          <div className="text-white/80 text-sm">Index</div>
          <div className="text-white/60 text-xs mt-1">UV Level</div>
        </motion.div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-center items-center mt-8 pt-6 border-t border-white/30">
        <div className="flex items-center space-x-2 text-white/80">
          <Droplets className="w-5 h-5" />
          <span className="text-lg">
            Rain Chance: {weatherData.current.precipProb}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
