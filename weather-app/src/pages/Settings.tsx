import { Link } from 'react-router-dom'
import TemperatureToggle from '../components/TemperatureToggle'
import { useAppSelector } from '../store/hooks'

const Settings = () => {
  const temperatureUnit = useAppSelector((state) => state.temperature.unit)

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary mb-8 hover:underline">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>

        <h1 className="text-4xl font-black mb-8">Settings</h1>

        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Temperature Unit</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Currently showing temperatures in {temperatureUnit === 'C' ? 'Celsius' : 'Fahrenheit'}
              </p>
            </div>
            <TemperatureToggle />
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <h3 className="font-bold mb-2">About</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              WeatherWise - Your personal weather companion
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings