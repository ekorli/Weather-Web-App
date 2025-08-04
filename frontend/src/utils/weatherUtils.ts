import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  Eye,
  Wind,
  Droplets,
  Thermometer
} from 'lucide-react';

export const getWeatherIcon = (iconCode: string) => {
  const iconMap: { [key: string]: any } = {
    'clear-day': Sun,
    'clear-night': Sun,
    'partly-cloudy-day': Cloud,
    'partly-cloudy-night': Cloud,
    'cloudy': Cloud,
    'overcast': Cloud,
    'fog': Cloud,
    'wind': Wind,
    'rain': CloudRain,
    'drizzle': CloudDrizzle,
    'showers-day': CloudRain,
    'showers-night': CloudRain,
    'thunder-rain': CloudLightning,
    'thunder-showers-day': CloudLightning,
    'thunder-showers-night': CloudLightning,
    'snow': CloudSnow,
    'snow-showers-day': CloudSnow,
    'snow-showers-night': CloudSnow,
  };

  return iconMap[iconCode] || Cloud;
};

export const formatTime = (datetime: string): string => {
  const date = new Date(`2000-01-01T${datetime}`);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    hour12: true 
  });
};

export const formatDateTime = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    hour12: true
  });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getUVIndexLevel = (uvIndex: number): { level: string; color: string } => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-600' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600' };
  return { level: 'Extreme', color: 'text-purple-600' };
};

export const getTemperatureColor = (temp: number): string => {
  if (temp <= 0) return 'text-blue-600';
  if (temp <= 10) return 'text-blue-400';
  if (temp <= 20) return 'text-green-500';
  if (temp <= 30) return 'text-yellow-500';
  return 'text-red-500';
};
