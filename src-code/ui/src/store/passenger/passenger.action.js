import { createAction } from 'utils/reducer/reducer.utils';
import { PASSENGER_ACTION_TYPES } from './passenger.types';

export const createPassengerStart = (passenger) => createAction(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_START, passenger);

export const createPassengerSuccess = (passenger) => createAction(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_SUCCESS, passenger);

export const createPassengerFailed = (error) => createAction(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_FAILED, error);

export const havePassengerSuccess = (passenger) => createAction(PASSENGER_ACTION_TYPES.HAVE_PASSENGER_SUCCESS, passenger);
