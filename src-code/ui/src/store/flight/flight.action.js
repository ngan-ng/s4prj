import {createAction} from "../../utils/reducer/reducer.utils";
import {FLIGHT_ACTION_TYPES} from "./flight.types";

export const searchFlightStart = (searchDto) => createAction(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_START, searchDto);

export const searchFlightSuccess = (searchDto) => createAction(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_SUCCESS, searchDto);

export const searchFlightFailed = (error) => createAction(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_FAILED, {error});
