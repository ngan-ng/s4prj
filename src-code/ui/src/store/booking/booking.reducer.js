import BOOKING_ACTION_TYPES from './booking.type';
const BOOKING_INITIAL_STATE = {
  isFetching: false,
  bookings: {},
  error: ''
};

export const bookingReducer = (state = BOOKING_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_START:
      return {
        ...state,
        isFetching: true
      };
    case BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookings: payload
      };
    case BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_FAILED:
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    default:
      return state;
  }
};
