/* eslint-disable no-unused-vars */
import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { clearPassengers, createPassengerFailed, createPassengerSuccess } from './passenger.action';
import { PASSENGER_ACTION_TYPES } from './passenger.types';

export function* createPassengerAsync({ payload }) {
  try {
    //yield call(createPassenger, aaa);
    yield put(createPassengerSuccess(payload));
  } catch (error) {
    yield put(createPassengerFailed(error));
  }
}

export function* clear() {
  yield call(clearPassengers);
}
export function* onCreatePassengerStart() {
  yield takeLatest(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_START, createPassengerAsync);
}
export function* onClearPax() {
  yield takeLatest(PASSENGER_ACTION_TYPES.CLEAR_PASSENGERS, clear);
}
export function* passengerSagas() {
  yield all([call(onCreatePassengerStart, call[onClearPax])]);
}
