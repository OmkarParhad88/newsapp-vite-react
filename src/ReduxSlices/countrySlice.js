import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  code: "in",
  region: "India",
}
export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    },
  },
})

export const { setCode , setRegion } = countrySlice.actions
export default countrySlice.reducer