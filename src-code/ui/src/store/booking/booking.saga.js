import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import BOOKING_ACTION_TYPES from './booking.type';
import axiosCall from 'api/callAxios';
import { fetchBookingByPnrFailed, fetchBookingByPnrSuccess } from './booking.action';

const getBookingsByPnr = async ({ pnr }) => {
  console.log(pnr);
  const resp = await axiosCall.get(`/api-v1/guest/booking/${pnr}`);
  return resp;
};

function* fetchBookingByPnrAsync({ payload }) {
  try {
    console.log('Payload: ' + payload);
    yield delay(3000);
    const resp = yield call(getBookingsByPnr, payload);
    yield put(fetchBookingByPnrSuccess(resp.data));
  } catch (error) {
    yield put(fetchBookingByPnrFailed(error));
  }
}

export function* onFetchBookingByPnr() {
  yield takeLatest(BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_START, fetchBookingByPnrAsync);
}

export function* bookingSaga() {
  yield all([call(onFetchBookingByPnr)]);
}
