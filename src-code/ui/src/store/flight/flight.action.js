import {createAction} from "../../utils/reducer/reducer.utils";
import {FLIGHT_ACTION_TYPES} from "./flight.types";

export const sendSearchDtoStart = (origin, destination, departDate, returnDate, tripType) => createAction(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_START, {origin, destination, departDate, returnDate, tripType});

export const sendSearchDtoSuccess = (origin, destination, departDate, returnDate, tripType) => createAction(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_SUCCESS, { origin, destination, departDate, returnDate, tripType });

export const sendSearchDtoFailed = (error) => createAction(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_FAILED, {error});
