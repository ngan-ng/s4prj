import { createSelector } from 'reselect';

const selectAirportReducer = (state) => state.airports; // airportReducer

export const selectAirports = createSelector([selectAirportReducer], (airportSlice) => airportSlice.airports);
