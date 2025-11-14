// store/temperatureSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export type TemperatureUnit = 'C' | 'F'

interface TemperatureState {
  unit: TemperatureUnit
}

const initialState: TemperatureState = {
  unit: 'C',
}

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.unit = action.payload
    },
    toggleTemperatureUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C'
    },
  },
})

export const { setTemperatureUnit, toggleTemperatureUnit } = temperatureSlice.actions
export default temperatureSlice.reducer
