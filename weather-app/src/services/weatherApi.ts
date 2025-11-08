import axios from 'axios'
import { WeatherApiResponse, ForecastApiResponse } from '../types/weatherApi'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

if (!API_KEY) {
  console.error('OpenWeatherMap API key is missing! Please add VITE_OPENWEATHER_API_KEY to your .env file')
}

export const weatherApi = {
  getCurrentWeather: async (cityName: string): Promise<WeatherApiResponse> => {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${BASE_URL}/weather`,
        {
          params: {
            q: cityName,
            appid: API_KEY,
            units: 'metric', 
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  },

  getForecast: async (cityName: string): Promise<ForecastApiResponse> => {
    try {
      const response = await axios.get<ForecastApiResponse>(
        `${BASE_URL}/forecast`,
        {
          params: {
            q: cityName,
            appid: API_KEY,
            units: 'metric',
            cnt: 40, 
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  },

  getWeatherByCoords: async (lat: number, lon: number): Promise<WeatherApiResponse> => {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${BASE_URL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching weather by coords:', error)
      throw error
    }
  },
}

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}