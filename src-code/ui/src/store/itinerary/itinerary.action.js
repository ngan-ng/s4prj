import { createAction } from 'utils/reducer/reducer.utils';
import { ITINERARY_ACTION_TYPES } from './itinerary.types';

// export const fetchBookingsStart = (payload) => createAction(ITINERARY_ACTION_TYPES.FETCH_BOOKINGS_START, payload);
// export const fetchBookingsSuccess = (payload) => createAction(ITINERARY_ACTION_TYPES.FETCH_BOOKINGS_SUCCESS, payload);
// export const fetchBookingsFailed = (error) => createAction(ITINERARY_ACTION_TYPES.FETCH_BOOKINGS_FAILED, { error });

export const fetchCompletedPaypalStart = (payload) => createAction(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_START, payload);

export const fetchCompletedPaypalSuccess = (payload) => createAction(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_SUCCESS, payload);

export const fetchCompletedPaypalFailed = (error) => createAction(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_FAILED, { error });
