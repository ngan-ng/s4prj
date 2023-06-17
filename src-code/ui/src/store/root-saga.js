import { all, call } from 'redux-saga/effects';
import { airportSaga } from './airport/airport.saga';
import { userSagas } from './user/user.sagas';
// import { userSagas } from './user/user.saga';

export function* rootSaga() {
  yield all([call(airportSaga), call(userSagas)]);
}
