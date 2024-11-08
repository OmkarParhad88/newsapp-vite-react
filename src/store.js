import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './ReduxSlices/countrySlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
})  