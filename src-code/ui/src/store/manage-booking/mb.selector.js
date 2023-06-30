import { createSelector } from 'reselect';

const selectManageBookingReducer = (state) => state;

export const selectManageBookingObj = createSelector([selectManageBookingReducer], (slice) => slice.manageBookingObj);
