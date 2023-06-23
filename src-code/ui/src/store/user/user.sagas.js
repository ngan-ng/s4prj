import { all, call, put, takeLatest } from 'redux-saga/effects';
import { signIn, signOut } from './../../azure/authPopup';
import { signinFailure, signinSuccess, signOutSuccess } from './user.action';
import userActionTypes from './user.types';

export function* login() {
  try {
    const resp = yield call(signIn);
    // console.log('Saga Login: ... ' + res.account.idTokenClaims.emails[0]);
    if (resp.account !== null) {
      let id_token_claim = resp.account.idTokenClaims;
      let email = id_token_claim.emails[0];
      let givenName = id_token_claim.given_name;
      let surName = id_token_claim.family_name;
      let user = { givenName: givenName, surName: surName, email: email, loyaltyPoint: 0 };

      yield put(signinSuccess(user));
    }
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
