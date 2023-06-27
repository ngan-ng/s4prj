import { all, call, takeLatest } from 'redux-saga/effects';
import MB_ACTION_TYPE from './mb.type';
import { mb_clear, mb_selectFlight, mb_selectPax } from './mb.action';

function* selectFlight({ payload }) {
  try {
    yield call(mb_selectFlight, payload);
  } catch (error) {
    console.log(error);
  }
}
function* selectPax({ payload }) {
  try {
    console.log('Select Pax SAGA: ');
    console.log(payload);
    yield call(mb_selectPax, payload);
  } catch (error) {
    console.log(error);
  }
}
function* clear() {
  try {
    yield call(mb_clear);
  } catch (error) {
    console.log(error);
  }
}
export function* manageBookingSelectFlight() {
  yield takeLatest(MB_ACTION_TYPE.SELECT_FLIGHT, selectFlight);
}
export function* manageBookingSelectPax() {
  yield takeLatest(MB_ACTION_TYPE.SELECT_PAX, selectPax);
}
export function* manageBookingClear() {
  yield takeLatest(MB_ACTION_TYPE.MB_CLEAR, clear);
}
export function* manage_bookingSaga() {
  yield all([call(manageBookingClear), call(manageBookingSelectFlight), call(manageBookingSelectPax)]);
}
