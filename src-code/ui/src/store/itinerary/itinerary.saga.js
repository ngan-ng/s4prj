/* eslint-disable no-unused-vars */
import axiosCall from 'api/callAxios';
import { fetchCompletedPaypalFailed, fetchCompletedPaypalSuccess, sendEmailFailed, sendEmailSuccess } from './itinerary.action';
import { ITINERARY_ACTION_TYPES } from './itinerary.types';
import { all, call, put, takeLatest } from 'redux-saga/effects';

const postContent = async (objEmail) => {
  const resp = await axiosCall.post('/api-v1/guest/email/send', objEmail);
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
    const objEmail = {
      firstName: payload.reviewDtos[0].booking.firstName,
      lastName: payload.reviewDtos[0].booking.lastName,
      pnr: payload.reviewDtos[0].booking.pnr,
      email: payload.reviewDtos[0].booking.email,
      payerEmail: payload.payerEmail,
      paymentMethod: payload.paymentMethod
    };
    
    const resp = yield call(postContent, objEmail);
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
