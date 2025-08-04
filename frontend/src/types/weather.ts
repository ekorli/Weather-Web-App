export interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  precipProb: number;
  conditions: string;
  icon: string;
  humidity: number;
  visibility: number;
  uvIndex: number;
  datetime: string;
}

export interface HourlyWeather {
  datetime: string;
  temperature: number;
  windSpeed: number;
  precipProb: number;
  conditions: string;
  icon: string;
  isPast: boolean;
}

export interface WeatherData {
  location: string;
  current: CurrentWeather;
  hourly: HourlyWeather[];
}

export interface LocationData {
  city: string;
  country: string;
  lat: number;
  lon: number;
}
