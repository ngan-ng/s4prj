import mb_types from './mb.type';

export const mb_selectFlightSuccess = (payload) => ({
  type: mb_types.SELECT_FLIGHT_SUCCESS,
  payload: payload
});
