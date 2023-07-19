import { createSelector } from 'reselect';

const selectItineraryReducer = (state) => state.itinerary;

// export const selectBookingsItinerary = createSelector([selectItineraryReducer], (itinerarySlice) => itinerarySlice.bookings);

export const selectCompletedPaypal = createSelector([selectItineraryReducer], (itinerarySlice) => itinerarySlice.completedPaypal);
