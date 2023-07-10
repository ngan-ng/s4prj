import mb_types from './mb.type';

export const mb_selectFlight = (payload) => ({
  type: mb_types.SELECT_FLIGHT,
  payload: payload
});
export const mb_selectPax = (payload) => ({
  type: mb_types.SELECT_PAX,
  payload: payload
});
export const checkinStart = (checkinRequestDtos) => ({
  type: mb_types.CHECKIN_START,
  payload: checkinRequestDtos
});
export const checkinSuccess = (boardingPasses) => ({
  type: mb_types.CHECKIN_SUCCESS,
  payload: boardingPasses
});
export const checkinFailed = (err) => ({
  type: mb_types.CHECKIN_FAILED,
  payload: err
});
export const mb_clear = () => ({
  type: mb_types.MB_CLEAR
});
