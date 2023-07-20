import { createSelector } from 'reselect';

const selectItineraryReducer = (state) => state.itinerary;

export const selectCompletedPaypal = createSelector([selectItineraryReducer], (itinerarySlice) => itinerarySlice.completedPaypal);
