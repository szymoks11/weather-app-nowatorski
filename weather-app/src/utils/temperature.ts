import { TemperatureUnit } from '../store/temperatureSlice'

export const convertTemperature = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'F') {
    return Math.round((temp * 9/5) + 32)
  }
  return temp
}

export const getTemperatureSymbol = (unit: TemperatureUnit): string => {
  return unit === 'C' ? '°C' : '°F'
}