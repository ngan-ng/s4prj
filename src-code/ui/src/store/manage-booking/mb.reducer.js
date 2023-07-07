import MB_ACTION_TYPE from './mb.type';
const MB_INITIAL_STATE = {
  flightId: 0,
  pax: []
};
export const manageBookingReducer = (state = MB_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case MB_ACTION_TYPE.SELECT_FLIGHT:
      return {
        flightId: payload,
        pax: []
      };
    case MB_ACTION_TYPE.SELECT_PAX:
      return {
        ...state,
        pax: [...payload]
      };
    case MB_ACTION_TYPE.MB_CLEAR:
      return MB_INITIAL_STATE;
    default:
      return { ...state };
  }
};
