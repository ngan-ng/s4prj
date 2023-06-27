import mb_types from './mb.type';

export const mb_selectFlight = (payload) => ({
  type: mb_types.SELECT_FLIGHT,
  payload: payload
});
export const mb_selectPax = (payload) => ({
  type: mb_types.SELECT_PAX,
  payload: payload
});
export const mb_selectSeat = (payload) => ({
  type: mb_types.SELECT_SEAT,
  payload: payload
});
export const mb_clear = () => ({
  type: mb_types.MB_CLEAR
});
