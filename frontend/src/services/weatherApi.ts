import axios from 'axios';
import { WeatherData, LocationData } from '../types/weather';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const weatherApi = {
  async getWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/${encodeURIComponent(location)}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to fetch weather data');
      }
      throw new Error('Failed to fetch weather data');
    }
  },

  async getCurrentLocation(): Promise<LocationData> {
    try {
      const response = await axios.get(`${API_BASE_URL}/location`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to get current location');
      }
      throw new Error('Failed to get current location');
    }
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data.status === 'OK';
    } catch (error) {
      return false;
    }
  }
};
