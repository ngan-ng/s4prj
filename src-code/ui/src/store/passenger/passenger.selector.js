import { createSelector } from 'reselect';

const selectPassengerReducer = (state) => state.passengers;

export const selectPassengers = createSelector([selectPassengerReducer], (passengerSlice) => passengerSlice.passengers);
