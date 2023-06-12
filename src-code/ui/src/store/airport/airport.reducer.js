import action_types from './airport.type';

const AIRPORT_INITIAL_STATE = {
  airports: {},
  error: ''
};
export const airportReducer = (state = AIRPORT_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case action_types.FETCH_AIRPORT_SUCCESS:
      return {
        ...state,
        airports: payload.data
      };
    case action_types.FETCH_AIRPORT_FAILED:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
