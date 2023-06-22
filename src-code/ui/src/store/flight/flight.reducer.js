import {FLIGHT_ACTION_TYPES} from "./flight.types";

const INITIAL_STATE = {
    flights: null,
    error: null
};

export const flightReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_SUCCESS:
            return {
                ...state,
                flights: payload
            };
        case FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
};
