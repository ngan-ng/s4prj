/* eslint-disable no-unused-vars */
import axiosCall from 'api/callAxios';
import { fetchCompletedPaypalFailed, fetchCompletedPaypalSuccess, sendEmailFailed, sendEmailSuccess } from './itinerary.action';
import { ITINERARY_ACTION_TYPES } from './itinerary.types';
import { all, call, put, takeLatest } from 'redux-saga/effects';

const postContent = async (payload) => {
  const resp = await axiosCall.post('/api-v1/guest/email/send', payload);
  console.log('resp api', resp);
  return resp;
};

function* fetchCompletedPaypalStart({ payload }) {
  try {
    yield put(fetchCompletedPaypalSuccess(payload.data));
  } catch (error) {
    yield put(fetchCompletedPaypalFailed(error));
  }
}

function* emailStart({ payload }) {
  try {
    const resp = yield call(postContent, payload);
    yield put(sendEmailSuccess(payload));
  } catch (error) {
    yield put(sendEmailFailed(error));
  }
}

export function* onfetchCompletedPaypalStart() {
  yield takeLatest(ITINERARY_ACTION_TYPES.FETCH_COMPLETED_PAYPAL_START, fetchCompletedPaypalStart);
}

export function* onSendEmailStart() {
  yield takeLatest(ITINERARY_ACTION_TYPES.SEND_EMAIL_START, emailStart);
}

export function* itinerarySagas() {
  yield all([call(onfetchCompletedPaypalStart), call(onSendEmailStart)]);
}
