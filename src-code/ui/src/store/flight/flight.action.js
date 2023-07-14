import { createAction } from '../../utils/reducer/reducer.utils';
import { FLIGHT_ACTION_TYPES } from './flight.types';

export const searchFlightStart = (searchDto) => createAction(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_START, searchDto);

export const searchFlightSuccess = (searchDto) => createAction(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_SUCCESS, searchDto);

export const searchFlightFailed = (error) => createAction(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_FAILED, { error });

export const selectDepartIdStart = (idDepart) => createAction(FLIGHT_ACTION_TYPES.SELECT_DEPART_ID_START, idDepart);

export const selectDepartIdSuccess = (idDepart) => createAction(FLIGHT_ACTION_TYPES.SELECT_DEPART_ID_SUCCESS, idDepart);

export const selectReturnIdStart = (idReturn) => createAction(FLIGHT_ACTION_TYPES.SELECT_RETURN_ID_START, idReturn);
export const selectReturnIdSuccess = (idReturn) => createAction(FLIGHT_ACTION_TYPES.SELECT_RETURN_ID_SUCCESS, idReturn);

export const selectFlightClear = () => createAction(FLIGHT_ACTION_TYPES.SELECT_FLIGHT_CLEAR);
