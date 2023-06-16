import { all, call } from 'redux-saga/effects';
import { airportSaga } from './airport/airport.saga';
// import { userSagas } from './user/user.saga';
import { claimSagas } from './claim/claim.sagas';

export function* rootSaga() {
  yield all([call(airportSaga), call(claimSagas)]);
}
