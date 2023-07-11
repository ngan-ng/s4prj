import { createAction } from 'utils/reducer/reducer.utils';
import { PASSENGER_ACTION_TYPES } from './passenger.types';

export const createPassengerStart = (passenger) => createAction(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_START, passenger);
export const createPassengerSuccess = (passenger) => createAction(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_SUCCESS, passenger);
export const createPassengerFailed = (error) => createAction(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_FAILED, error);

export const createBookingsStart = (bookings) => createAction(PASSENGER_ACTION_TYPES.CREATE_BOOKINGS_START, bookings);
export const createBookingsSuccess = (bookings) => createAction(PASSENGER_ACTION_TYPES.CREATE_BOOKINGS_SUCCESS, bookings);
export const createBookingsFailed = (errors) => createAction(PASSENGER_ACTION_TYPES.CREATE_BOOKINGS_FAILED, errors);

export const clearPassengers = () => ({ type: PASSENGER_ACTION_TYPES.CLEAR_PASSENGERS });
