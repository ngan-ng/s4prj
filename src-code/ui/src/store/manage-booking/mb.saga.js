import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import MB_ACTION_TYPE from './mb.type';
import { checkinFailed, checkinSuccess, mb_clear, mb_selectFlight, mb_selectPax } from './mb.action';
import { clearSeats } from 'store/seat/seat.action';
import axiosCall from 'api/callAxios';

function* selectFlight({ payload }) {
  try {
    // Clear seats of the previous flight
    yield put(clearSeats());
    // then select the new one
    yield call(mb_selectFlight, payload);
  } catch (error) {
    console.log(error);
  }
}
function* selectPax({ payload }) {
  try {
    yield mb_selectPax(payload);
  } catch (error) {
    console.log(error);
  }
}
const checkin = async (checkinRequestDtos) => {
  return await axiosCall.post('/api-v1/guest/booking/checkin', checkinRequestDtos);
};
function* checkinStartAsync({ payload }) {
  try {
    yield delay(2000);
    const resp = yield call(checkin, payload);
    if (resp.status === 200) {
      yield put(checkinSuccess(resp.data));
    }
  } catch (error) {
    yield put(checkinFailed(error));
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
export function* onCheckinStart() {
  yield takeLatest(MB_ACTION_TYPE.CHECKIN_START, checkinStartAsync);
}
export function* manageBookingClear() {
  yield takeLatest(MB_ACTION_TYPE.MB_CLEAR, clear);
}
export function* manage_bookingSaga() {
  yield all([call(onCheckinStart), call(manageBookingClear), call(manageBookingSelectFlight), call(manageBookingSelectPax)]);
}
