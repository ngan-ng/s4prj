import BOOKING_ACTION_TYPES from './booking.type';
const BOOKING_INITIAL_STATE = {
  isFetching: false,
  bookings: {},
  isClickPayment: false,
  error: ''
};

export const bookingReducer = (state = BOOKING_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_START:
      return {
        ...state,
        isClickPayment: false,
        isFetching: true
      };
    case BOOKING_ACTION_TYPES.CREATE_BOOKING_START:
      return {
        ...state
      };
    case BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_SUCCESS:
    case BOOKING_ACTION_TYPES.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookings: payload,
        isClickPayment: false,
        error: ''
        //isCreated: true
      };
    case BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_FAILED:
      return {
        ...state,
        isFetching: false,
        bookings: null,
        isClickPayment: false,
        error: payload
      };
    // case BOOKING_ACTION_TYPES.BOOKING_CLEAR_TEMP:
    //   return {
    //     ...BOOKING_INITIAL_STATE,
    //     isCreated: true
    //   };
    case BOOKING_ACTION_TYPES.IS_CLICK_PAYMENT:
      return {
        ...state,
        isFetching: false,
        isClickPayment: true
      };
    case BOOKING_ACTION_TYPES.BOOKING_CLEAR:
      return BOOKING_INITIAL_STATE;
    default:
      return { ...state };
  }
};
