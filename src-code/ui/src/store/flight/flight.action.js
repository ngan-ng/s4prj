import {createAction} from "../../utils/reducer/reducer.utils";
import {FLIGHT_ACTION_TYPES} from "./flight.types";

export const sendSearchDtoStart = (searchDto) => createAction(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_START, searchDto);

export const sendSearchDtoSuccess = (searchDto) => createAction(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_SUCCESS, searchDto);

export const sendSearchDtoFailed = (error) => createAction(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_FAILED, {error});
