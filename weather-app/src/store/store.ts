import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureSlice';
import favoritesReducer from './favoritesSlice';
import { loadState } from './localStorageMiddleware';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    temperature: temperatureReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;