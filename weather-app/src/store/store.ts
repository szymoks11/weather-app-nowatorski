import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureSlice';
import favoritesReducer from './favoritesSlice';

const preloadedState: any = (() => {
  try {
    const saved = localStorage.getItem('appState');
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
})();

export const store = configureStore({
  reducer: {
    temperature: temperatureReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;