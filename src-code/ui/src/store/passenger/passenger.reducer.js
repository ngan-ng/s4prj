import { PASSENGER_ACTION_TYPES } from './passenger.types';

const INITIAL_STATE = {
  passengers: null,
  error: null
};

export const passengerReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PASSENGER_ACTION_TYPES.CREATE_PASSENGER_SUCCESS:
      return {
        ...state,
        passengers: [...payload],
        error: null
      };
    case PASSENGER_ACTION_TYPES.CREATE_PASSENGER_FAILED:
      return {
        ...state,
        error: payload
      };
    case PASSENGER_ACTION_TYPES.CLEAR_PASSENGERS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
