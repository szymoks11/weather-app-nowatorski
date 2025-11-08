import { useParams, Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { convertTemperature, getTemperatureSymbol } from '../utils/temperature'
import FavoriteButton from '../components/FavoriteButton'
import { useWeather } from '../hooks/useWeather'
import { useForecast } from '../hooks/useForecast'
import { getCityById } from '../data/cities'
import { getWeatherIconUrl, getWindDirection } from '../services/weatherApi'

const CityWeather = () => {
  const { cityId } = useParams<{ cityId: string }>()
  const temperatureUnit = useAppSelector((state) => state.temperature.unit)
  const tempSymbol = getTemperatureSymbol(temperatureUnit)
  
  const city = getCityById(Number(cityId))
  
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(city?.name || '')
  const { data: forecastData, loading: forecastLoading } = useForecast(city?.name || '')

  if (!city) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary mb-4">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">City not found</h1>
        </div>
      </div>
    )
  }

  if (weatherLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (weatherError || !weatherData) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary mb-4">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded">
            <p className="font-bold">Error loading weather data</p>
            <p>Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  const displayTemp = convertTemperature(Math.round(weatherData.main.temp), temperatureUnit)
  const feelsLike = convertTemperature(Math.round(weatherData.main.feels_like), temperatureUnit)
  const windDirection = getWindDirection(weatherData.wind.deg)

  const now = new Date()
  const dateString = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
        </div>

        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black tracking-tight">{city.name}</h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              {weatherData.sys.country} • {dateString}
            </p>
          </div>
          <FavoriteButton cityId={city.id} size="large" />
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-6">
            <img 
              src={getWeatherIconUrl(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="w-32 h-32"
            />
            <div>
              <p className="text-7xl font-bold">{displayTemp}{tempSymbol}</p>
              <p className="text-2xl text-zinc-500 dark:text-zinc-400 capitalize">
                {weatherData.weather[0].description}
              </p>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                Feels like {feelsLike}{tempSymbol}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
          {forecastLoading ? (
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-zinc-800 rounded-xl p-4 animate-pulse">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
                  <div className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {forecastData.map((day, index) => (
                <div key={index} className="bg-white dark:bg-zinc-800 rounded-xl p-4 flex flex-col items-center gap-2">
                  <p className="font-bold text-lg">{day.day}</p>
                  <img 
                    src={getWeatherIconUrl(day.icon)}
                    alt={day.description}
                    className="w-16 h-16"
                  />
                  <p className="capitalize text-sm text-center text-zinc-500 dark:text-zinc-400">
                    {day.description}
                  </p>
                  <p className="font-bold">
                    {convertTemperature(day.high, temperatureUnit)}°/
                    {convertTemperature(day.low, temperatureUnit)}°
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Detailed Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-zinc-500 dark:text-zinc-400">Humidity</p>
              <div className="flex items-baseline gap-2">
                <span className="material-symbols-outlined text-primary">water_drop</span>
                <p className="text-2xl font-bold">{weatherData.main.humidity}%</p>
              </div>
              <p className="text-sm">Dew point: {Math.round(weatherData.main.temp - ((100 - weatherData.main.humidity) / 5))}°C</p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-zinc-500 dark:text-zinc-400">Wind</p>
              <div className="flex items-baseline gap-2">
                <span className="material-symbols-outlined text-primary">air</span>
                <p className="text-2xl font-bold">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary">navigation</span>
                <p className="text-sm">Direction: {windDirection}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-zinc-500 dark:text-zinc-400">Cloud Coverage</p>
              <div className="flex items-baseline gap-2">
                <span className="material-symbols-outlined text-primary">cloud</span>
                <p className="text-2xl font-bold">{weatherData.clouds.all}%</p>
              </div>
              <p className="text-sm">
                {weatherData.clouds.all > 75 ? 'High' : weatherData.clouds.all > 50 ? 'Medium' : 'Low'} cloud density
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-zinc-500 dark:text-zinc-400">Pressure</p>
              <div className="flex items-baseline gap-2">
                <span className="material-symbols-outlined text-primary">compress</span>
                <p className="text-2xl font-bold">{weatherData.main.pressure} hPa</p>
              </div>
              <p className="text-sm">Standard atmospheric pressure</p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-zinc-500 dark:text-zinc-400">Visibility</p>
              <div className="flex items-baseline gap-2">
                <span className="material-symbols-outlined text-primary">visibility</span>
                <p className="text-2xl font-bold">{(weatherData.visibility / 1000).toFixed(1)} km</p>
              </div>
              <p className="text-sm">
                {weatherData.visibility >= 10000 ? 'Excellent' : weatherData.visibility >= 5000 ? 'Good' : 'Poor'} visibility
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
              <p className="text-zinc-500 dark:text-zinc-400">Temperature Range</p>
              <div className="flex items-baseline gap-2">
                <span className="material-symbols-outlined text-primary">thermostat</span>
                <p className="text-2xl font-bold">
                  {convertTemperature(Math.round(weatherData.main.temp_min), temperatureUnit)}° - {convertTemperature(Math.round(weatherData.main.temp_max), temperatureUnit)}°
                </p>
              </div>
              <p className="text-sm">Min/Max today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityWeather