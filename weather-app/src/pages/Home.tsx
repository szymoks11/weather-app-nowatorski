import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { City } from '../types/weather'
import { useAppSelector } from '../store/hooks'
import { convertTemperature, getTemperatureSymbol } from '../utils/temperature'
import FavoriteButton from '../components/FavoriteButton'
import { weatherApi } from '../services/weatherApi'
import { cities } from '../data/cities'

type FilterType = 'all' | 'favorites'

interface CityWithWeather extends City {
  temp?: number
  icon?: string
  description?: string
  loading?: boolean
}

const Home = () => {
  const temperatureUnit = useAppSelector((state) => state.temperature.unit)
  const favorites = useAppSelector((state) => state.favorites.cityIds)
  const tempSymbol = getTemperatureSymbol(temperatureUnit)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [citiesWithWeather, setCitiesWithWeather] = useState<CityWithWeather[]>(cities)

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      const updatedCities = await Promise.all(
        cities.map(async (city) => {
          try {
            const weather = await weatherApi.getCurrentWeather(city.name)
            return {
              ...city,
              temp: Math.round(weather.main.temp),
              icon: weather.weather[0].icon,
              description: weather.weather[0].description,
              loading: false,
            }
          } catch (error) {
            console.error(`Error fetching weather for ${city.name}:`, error)
            return {
              ...city,
              temp: undefined,
              loading: false,
            }
          }
        })
      )
      setCitiesWithWeather(updatedCities)
    }

    fetchWeatherForCities()
  }, [])

  const filteredCities = citiesWithWeather.filter((city) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      city.name.toLowerCase().includes(searchLower) ||
      city.country.toLowerCase().includes(searchLower)
    
    const matchesFilter = filter === 'all' || favorites.includes(city.id)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by city name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-800 rounded-xl border-2 border-transparent focus:border-primary focus:outline-none text-lg transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <span className="material-symbols-outlined">public</span>
            All Cities ({cities.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'favorites'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <span 
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            Favorites ({favorites.length})
          </button>
        </div>

        {searchQuery && (
          <div className="mb-4 text-zinc-600 dark:text-zinc-400">
            Found {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'}
          </div>
        )}

        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => {
              const displayTemp = city.temp ? convertTemperature(city.temp, temperatureUnit) : null
              
              return (
                <Link
                  key={city.id}
                  to={`/city/${city.id}`}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer relative group"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <FavoriteButton cityId={city.id} size="medium" />
                  </div>

                  <div className="flex justify-between items-start mb-4 pr-8">
                    <div>
                      <h2 className="text-2xl font-bold">{city.name}</h2>
                      <p className="text-zinc-500 dark:text-zinc-400 capitalize">
                        {city.description || city.country}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {displayTemp !== null ? (
                        <p className="text-4xl font-bold text-primary">
                          {displayTemp}{tempSymbol}
                        </p>
                      ) : (
                        <div className="animate-pulse">
                          <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-sm font-medium">View Details</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-zinc-300 dark:text-zinc-600 mb-4">
              {filter === 'favorites' ? 'star_outline' : 'search_off'}
            </span>
            <h3 className="text-2xl font-bold mb-2">
              {filter === 'favorites' ? 'No favorite cities yet' : 'No cities found'}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              {filter === 'favorites' 
                ? 'Click the star icon on cities to add them to favorites'
                : 'Try searching with a different term'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home