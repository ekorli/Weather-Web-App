import React from "react";
import { HourlyWeather } from "../types/weather";
import { getWeatherIcon, formatTime } from "../utils/weatherUtils";
import { Wind, Droplets } from "lucide-react";
import { motion } from "framer-motion";

interface HourlyForecastProps {
  hourlyData: HourlyWeather[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyData,
}) => {
  return (
    <motion.div
      className="card bg-white bg-opacity-75 border-0 rounded-4 shadow-lg p-4 mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="h4 fw-bold text-dark mb-4">24-Hour Forecast</h3>
      <div className="overflow-auto">
        <div className="d-flex flex-row pb-2" style={{ gap: "1rem" }}>
          {hourlyData.slice(0, 12).map((hour, index) => {
            const WeatherIcon = getWeatherIcon(hour.icon);

            return (
              <motion.div
                key={index}
                className={`flex-shrink-0 text-center p-3 rounded-3 min-w-100 bg-light bg-opacity-75 border ${
                  hour.isPast ? "opacity-50" : ""
                }`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: hour.isPast ? 0.5 : 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="small text-secondary mb-2 fw-medium">
                  {formatTime(hour.datetime)}
                </div>
                <div className="mb-2">
                  <WeatherIcon
                    style={{ width: "40px", height: "40px", color: "#0d6efd" }}
                  />
                </div>
                <div className="h5 fw-bold text-primary mb-1">
                  {hour.temperature}0
                </div>
                <div className="small text-secondary mb-2 text-truncate">
                  {hour.conditions}
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-center gap-1 small text-secondary">
                    <Wind style={{ width: "16px", height: "16px" }} />
                    <span>{hour.windSpeed}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-1 small text-secondary">
                    <Droplets style={{ width: "16px", height: "16px" }} />
                    <span>{hour.precipProb}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
