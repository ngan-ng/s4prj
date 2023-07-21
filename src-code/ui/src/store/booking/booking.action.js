import booking_types from './booking.type';

export const fetchBookingByPnrStart = (pnr) => ({
  type: booking_types.FETCH_BOOKING_BY_PNR_START,
  payload: { pnr }
});
export const fetchBookingByPnrSuccess = (bookings) => ({
  type: booking_types.FETCH_BOOKING_BY_PNR_SUCCESS,
  payload: bookings
});
export const fetchBookingByPnrFailed = (error) => ({
  type: booking_types.FETCH_BOOKING_BY_PNR_FAILED,
  payload: error
});

export const createBookingStart = (bookings) => ({
  type: booking_types.CREATE_BOOKING_START,
  payload: { bookings }
});
export const createBookingSuccess = (bookings) => ({
  type: booking_types.CREATE_BOOKING_SUCCESS,
  payload: bookings
});
export const createBookingFailed = (error) => ({
  type: booking_types.FETCH_BOOKING_BY_PNR_FAILED,
  payload: error
});

export const b_clear = () => ({
  type: booking_types.BOOKING_CLEAR
});

export const isClickPayment = () => ({
  type: booking_types.IS_CLICK_PAYMENT
});
