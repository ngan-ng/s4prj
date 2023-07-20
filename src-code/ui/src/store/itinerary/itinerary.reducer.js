import { ITINERARY_ACTION_TYPES } from './itinerary.types';

const INITIAL_STATE = {
  sendEmail: null,
  completedPaypal: null,
  error: null
};

export const itineraryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_SUCCESS:
      return {
        ...state,
        completedPaypal: payload
      };
    case ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_FAILED:
    case ITINERARY_ACTION_TYPES.SEND_EMAIL_FAILED:
      return {
        ...state,
        error: payload
      };
    case ITINERARY_ACTION_TYPES.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        sendEmail: payload
      };
    default:
      return state;
  }
};
