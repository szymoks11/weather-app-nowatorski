import { useState, useEffect } from 'react'
import { weatherApi } from '../services/weatherApi'
import { WeatherApiResponse } from '../types/weatherApi'

interface UseWeatherResult {
  data: WeatherApiResponse | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export const useWeather = (cityName: string): UseWeatherResult => {
  const [data, setData] = useState<WeatherApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchWeather = async () => {
    if (!cityName) return

    setLoading(true)
    setError(null)

    try {
      const weatherData = await weatherApi.getCurrentWeather(cityName)
      setData(weatherData)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [cityName])

  return { data, loading, error, refetch: fetchWeather }
}