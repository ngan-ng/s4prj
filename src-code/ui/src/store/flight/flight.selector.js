import { createSelector } from 'reselect';

const selectFlightReducer = (state) => state.flight;

export const selectFlights = createSelector(
    [selectFlightReducer],
    (flightSlice) => flightSlice.flights
);
