import { createSelector } from 'reselect';

const selectManageBookingReducer = (state) => state.manageBookingObj;

export const selectManageBookingObj = createSelector([selectManageBookingReducer], (slice) => {
  slice.flightId, slice.pax, slice.seats;
});
