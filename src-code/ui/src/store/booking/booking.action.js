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
