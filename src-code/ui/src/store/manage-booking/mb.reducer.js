import MB_ACTION_TYPE from './mb.type';
const MB_INITIAL_STATE = {
  flightId: 0,
  pax: [],
  seats: []
};
export const manageBookingReducer = (state = MB_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case MB_ACTION_TYPE.SELECT_FLIGHT_SUCCESS:
      return {
        ...state,
        flightId: payload.flightId
      };
    default:
      return state;
  }
};
