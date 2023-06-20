import {FLIGHT_ACTION_TYPES} from "./flight.types";


const INITIAL_STATE = {
    searchFlight: null,
    error: null
};

export const flightReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_SUCCESS:
            return {
                ...state,
                searchFlight: payload
            };
        default:
            return state;
    }
};
