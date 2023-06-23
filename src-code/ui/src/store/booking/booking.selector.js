import { createSelector } from 'reselect';

const bookingReducer = (state) => state.bookings;

export const selectPnr = createSelector([bookingReducer], (bookingSlice) => bookingSlice.bookings);

export const isFetchingPnr = createSelector([bookingReducer], (slice) => slice.isFetching);
