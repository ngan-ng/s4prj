import { all, call, put, takeLatest } from 'redux-saga/effects';
import { signIn, signOut } from './../../azure/authPopup';
import { signinFailure, signinSuccess, signOutSuccess } from './user.action';
import userActionTypes from './user.types';
import axiosCall from 'api/callAxios';
const findUser = async (email, headers) => {
  const resp = await axiosCall
    // .post('/api-v1/user/addAdmin', { email }, { headers })
    .post('/api-v1/user/findUser', { email }, { headers });
  return resp;
};
export function* login() {
  try {
    const resp = yield call(signIn);

    if (resp.account !== null) {
      let id_token_claim = resp.account.idTokenClaims;
      let email = id_token_claim.emails[0];
      let givenName = id_token_claim.given_name;
      let surName = id_token_claim.family_name;
      let user = { givenName: givenName, surName: surName, email: email, loyaltyPoint: 0 };

      const headers = { Authorization: `Bearer ${resp.accessToken}` };
      const res = yield call(findUser, email, headers);
      if (res.status === 200) {
        let member = res.data;
        user.loyaltyPoint = member.loyaltyPoint;
      }
      yield put(signinSuccess(user));

      // const product = { name: 'Axios POST with Bearer Token' }; // request JSON body
      // auth header with bearer token
      // axios
      //   .post('https://testapi.jasonwatmore.com/products', product, { headers })
      //   .then((response) => (element.innerHTML = response.data.id));
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
