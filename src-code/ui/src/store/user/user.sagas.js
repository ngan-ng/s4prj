import { all, call, put, takeLatest } from 'redux-saga/effects';
import { signIn, signOut } from './../../azure/authPopup';
import { signinFailure, signinSuccess, signOutSuccess } from './user.action';
import userActionTypes from './user.types';

export function* login() {
  try {
    const res = yield call(signIn);
    // console.log('Saga Login: ... ' + res.account.idTokenClaims.emails[0]);
    yield put(signinSuccess(res));
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* logOut() {
  try {
    signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, login);
}
export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, logOut);
}

export function* userSagas() {
  yield all([call(onSignInStart), call(onSignOutStart)]);
}
