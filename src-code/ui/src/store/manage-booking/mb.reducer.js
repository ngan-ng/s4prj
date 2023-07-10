import MB_ACTION_TYPE from './mb.type';
const MB_INITIAL_STATE = {
  isManaging: false,
  flightId: 0,
  pax: [],
  boardingPasses: [],
  errors: ''
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
    case MB_ACTION_TYPE.CHECKIN_START:
      return {
        ...state,
        isManaging: true
      };
    case MB_ACTION_TYPE.CHECKIN_SUCCESS:
      return {
        ...state,
        isManaging: false,
        boardingPasses: [...payload]
      };
    case MB_ACTION_TYPE.CHECKIN_FAILED:
      return {
        ...state,
        isManaging: false,
        errros: payload
      };
    case MB_ACTION_TYPE.MB_CLEAR:
      return MB_INITIAL_STATE;
    default:
      return { ...state };
  }
};
