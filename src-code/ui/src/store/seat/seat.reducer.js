import { SEAT_ACTION_TYPES } from './seat.types';

const SEAT_INITIAL_STATE = {
  isFetching: false,
  seats: [],
  error: ''
};

export const seatReducer = (state = SEAT_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SEAT_ACTION_TYPES.FETCH_SEATS_START:
      return {
        ...state,
        isFetching: true
      };
    case SEAT_ACTION_TYPES.FETCH_SEATS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        seats: payload
      };
    case SEAT_ACTION_TYPES.FETCH_SEATS_FAILED:
      return {
        ...state,
        isFetching: false,
        seats: [],
        error: payload
      };
    case SEAT_ACTION_TYPES.UPDATE_SEATS:
      return {
        ...state,
        isFetching: false,
        seats: payload
      };
    case SEAT_ACTION_TYPES.CLEAR_SEATS:
      return SEAT_INITIAL_STATE;
    default:
      return { ...state };
  }
};
