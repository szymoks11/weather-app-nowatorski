import { Middleware } from '@reduxjs/toolkit'
import { RootState } from './store'

const LOCAL_STORAGE_KEY = 'weatherwise-state'

export const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Error loading state from localStorage:', err)
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      temperature: state.temperature,
      favorites: state.favorites,
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)
  } catch (err) {
    console.error('Error saving state to localStorage:', err)
  }
}

export const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action)
  saveState(store.getState())
  return result
}