import { createSelector } from 'reselect';

const selectFlightReducer = (state) => state.flights;

export const selectFlights = createSelector([selectFlightReducer], (flightSlice) => flightSlice.flights);

export const selectFlightsIsFetching = createSelector([selectFlightReducer], (flightSlice) => flightSlice.isFetching);

export const selectDepartId = createSelector([selectFlightReducer], (flightSlice) => flightSlice.DepartId);

export const selectReturnId = createSelector([selectFlightReducer], (flightSlice) => flightSlice.ReturnId);
