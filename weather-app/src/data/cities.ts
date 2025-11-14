import type { City } from '../types/weather'

export const cities: City[] = [
  { id: 1, name: 'London', country: 'GB' },
  { id: 2, name: 'New York', country: 'US' },
  { id: 3, name: 'Tokyo', country: 'JP' },
  { id: 4, name: 'Sydney', country: 'AU' },
  { id: 5, name: 'Paris', country: 'FR' },
  { id: 6, name: 'Berlin', country: 'DE' },
  { id: 7, name: 'Moscow', country: 'RU' },
  { id: 8, name: 'Dubai', country: 'AE' },
  { id: 9, name: 'Singapore', country: 'SG' },
  { id: 10, name: 'Toronto', country: 'CA' },
]

export const getCityById = (id: number): City | undefined => {
  return cities.find(city => city.id === id)
}

export const getCityByName = (name: string): City | undefined => {
  return cities.find(city => city.name.toLowerCase() === name.toLowerCase())
}