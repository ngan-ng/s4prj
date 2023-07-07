import { SEAT_ACTION_TYPES } from './seat.types';

export const fetchSeatsStart = (flightId) => ({
  type: SEAT_ACTION_TYPES.FETCH_SEATS_START,
  payload: flightId
});
export const fetchSeatsSuccess = (seats) => ({
  type: SEAT_ACTION_TYPES.FETCH_SEATS_SUCCESS,
  payload: seats
});
export const fetchSeatsFailed = (error) => ({
  type: SEAT_ACTION_TYPES.FETCH_SEATS_FAILED,
  payload: error
});
export const updateSeatSuccess = (seats) => ({
  type: SEAT_ACTION_TYPES.UPDATE_SEATS,
  payload: seats
});
export const clearSeats = () => ({
  type: SEAT_ACTION_TYPES.CLEAR_SEATS
});
