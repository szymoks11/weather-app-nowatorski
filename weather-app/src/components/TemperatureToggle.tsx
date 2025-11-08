import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTemperatureUnit } from '../store/temperatureSlice'

const TemperatureToggle = () => {
  const dispatch = useAppDispatch()
  const unit = useAppSelector((state) => state.temperature.unit)

  return (
    <button
      onClick={() => dispatch(toggleTemperatureUnit())}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
    >
      <span className="material-symbols-outlined">device_thermostat</span>
      <span className="font-bold">{unit === 'C' ? '°C' : '°F'}</span>
      <span className="text-sm">Switch to {unit === 'C' ? '°F' : '°C'}</span>
    </button>
  )
}

export default TemperatureToggle