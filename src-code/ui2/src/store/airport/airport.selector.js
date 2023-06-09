import { createSelector } from 'reselect'

const selectAirportReducer = (state) => state.airports;

export const selectAirports = createSelector(
    [selectAirportReducer],
    (airportSlice) => airportSlice.airports
);

