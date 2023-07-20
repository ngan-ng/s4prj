import { createAction } from 'utils/reducer/reducer.utils';
import { ITINERARY_ACTION_TYPES } from './itinerary.types';

export const fetchCompletedPaypalStart = (payload) => createAction(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_START, payload);

export const fetchCompletedPaypalSuccess = (payload) => createAction(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_SUCCESS, payload);

export const fetchCompletedPaypalFailed = (error) => createAction(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_FAILED, { error });


export const sendEmailStart = (payload) => createAction(ITINERARY_ACTION_TYPES.SEND_EMAIL_START, payload);
export const sendEmailSuccess = (payload) => createAction(ITINERARY_ACTION_TYPES.SEND_EMAIL_SUCCESS, payload);
export const sendEmailFailed = (error) => createAction(ITINERARY_ACTION_TYPES.SEND_EMAIL_FAILED, { error });
