import { createSelector } from 'reselect';

const selectSeatReducer = (state) => state.seats;

export const selectSeats = createSelector([selectSeatReducer], (slice) => slice.seats);
export const isFetchingSeats = createSelector([selectSeatReducer], (slice) => slice.isFetching);
