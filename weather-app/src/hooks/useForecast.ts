import { useState, useEffect } from 'react'
import { weatherApi } from '../services/weatherApi'
import { ForecastApiResponse } from '../types/weatherApi'
import { ForecastDay } from '../types/weather'

interface UseForecastResult {
  data: ForecastDay[]
  loading: boolean
  error: Error | null
}

export const useForecast = (cityName: string): UseForecastResult => {
  const [data, setData] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchForecast = async () => {
      if (!cityName) return

      setLoading(true)
      setError(null)

      try {
        const forecastData = await weatherApi.getForecast(cityName)
        
        const dailyForecasts: { [key: string]: any[] } = {}
        
        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000)
          const dateKey = date.toISOString().split('T')[0]
          
          if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = []
          }
          dailyForecasts[dateKey].push(item)
        })

        const forecast: ForecastDay[] = Object.entries(dailyForecasts)
          .slice(0, 5)
          .map(([dateKey, items]) => {
            const temps = items.map(item => item.main.temp)
            const high = Math.round(Math.max(...temps))
            const low = Math.round(Math.min(...temps))
            
            const noonItem = items.find(item => {
              const hour = new Date(item.dt * 1000).getHours()
              return hour === 12
            }) || items[0]

            const date = new Date(dateKey)
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })

            return {
              day: dayName,
              date: dateKey,
              icon: noonItem.weather[0].icon,
              description: noonItem.weather[0].description,
              high,
              low,
            }
          })

        setData(forecast)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [cityName])

  return { data, loading, error }
}