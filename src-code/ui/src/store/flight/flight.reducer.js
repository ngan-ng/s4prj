import { FLIGHT_ACTION_TYPES } from './flight.types';

const INITIAL_STATE = {
  flights: null,
  error: null,
  isFetching: false,
  DepartId: null,
  ReturnId: null
};

export const flightReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_START:
      return {
        ...state,
        isFetching: true
      };
    case FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        flights: payload
      };
    case FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    case FLIGHT_ACTION_TYPES.SELECT_DEPART_ID_SUCCESS:
      return {
        ...state,
        DepartId: payload
      };
    case FLIGHT_ACTION_TYPES.SELECT_RETURN_ID_SUCCESS:
      return {
        ...state,
        ReturnId: payload
      };
    case FLIGHT_ACTION_TYPES.SELECT_FLIGHT_CLEAR:
      return {
        ...state,
        DepartId: null,
        ReturnId: null
      };
    default:
      return state;
  }
};
