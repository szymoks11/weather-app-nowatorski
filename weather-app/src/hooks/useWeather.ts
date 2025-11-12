import { useState, useEffect, useCallback } from 'react'
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

  const fetchWeather = useCallback(async () => {
    if (!cityName) return

    setLoading(true)
    setError(null)

    try {
      const weatherData = await weatherApi.getCurrentWeather(cityName)
      setData(weatherData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch weather'))
    } finally {
      setLoading(false)
    }
  }, [cityName])

  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  return { data, loading, error, refetch: fetchWeather }
}