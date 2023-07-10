/* eslint-disable no-unused-vars */
import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { createPassengerFailed, createPassengerSuccess, havePassengerSuccess } from './passenger.action';
import { PASSENGER_ACTION_TYPES } from './passenger.types';
import axiosCall from 'api/callAxios';

// const createPassenger = async (passenger) => {
//   const resp = await axiosCall.post('/api-v1/guest/booking/create', passenger);
//   console.log(resp);
//   return resp;
// };

export function* havePassengers({ payload }) {
  try {
    console.log('payload', payload);
    yield put(havePassengerSuccess(payload));
  } catch (error) {
    console.log('error', error);
  }
}

export function* createPassengerAsync({ payload }) {
  try {
    console.log('payload', payload);
    //yield call(createPassenger, payload);
    yield call(createPassengerSuccess, payload);
  } catch (error) {
    yield put(createPassengerFailed(error));
  }
}

export function* onCreatePassengerStart() {
  yield takeLatest(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_START, createPassengerAsync);
}

export function* onHavePassengers() {
  yield takeLatest(PASSENGER_ACTION_TYPES.HAVE_PASSENGER_SUCCESS, havePassengers);
}

export function* passengerSagas() {
  yield all([call(onCreatePassengerStart), call(onHavePassengers)]);
}
