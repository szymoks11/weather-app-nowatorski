import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  cityIds: number[]
}

const initialState: FavoritesState = {
  cityIds: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const cityId = action.payload
      const index = state.cityIds.indexOf(cityId)
      
      if (index > -1) {
        state.cityIds.splice(index, 1)
      } else {
        state.cityIds.push(cityId)
      }
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.cityIds = action.payload
    },
  },
})

export const { toggleFavorite, setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
