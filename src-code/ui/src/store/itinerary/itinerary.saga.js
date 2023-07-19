import { fetchCompletedPaypalFailed, fetchCompletedPaypalSuccess } from './itinerary.action';
import { ITINERARY_ACTION_TYPES } from './itinerary.types';
import { all, call, put, takeLatest } from 'redux-saga/effects';

// function* fetchBookingsStart({ payload }) {
//   try {
//     console.log('fetchBookingsStart', payload);
//     yield put(fetchBookingsSuccess(payload));
//     console.log('fetchBookingsSuccess');
//   } catch (error) {
//     yield put(fetchBookingsFailed(error));
//   }
// }

function* fetchCompletedPaypalStart({ payload }) {
  try {
    yield put(fetchCompletedPaypalSuccess(payload.data));
  } catch (error) {
    yield put(fetchCompletedPaypalFailed(error));
  }
}

// export function* onfetchBookingsStart() {
//   yield takeLatest(ITINERARY_ACTION_TYPES.FETCH_BOOKINGS_START, fetchBookingsStart);
// }

export function* onfetchCompletedPaypalStart() {
  yield takeLatest(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_START, fetchCompletedPaypalStart);
}

export function* itinerarySagas() {
  yield all([call(onfetchCompletedPaypalStart)]);
}
