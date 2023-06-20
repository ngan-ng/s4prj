import { all, call } from 'redux-saga/effects';
import { airportSaga } from './airport/airport.saga';
import { userSagas } from './user/user.sagas';
import { flightSagas } from "./flight/flight.saga";

export function* rootSaga() {
  yield all([call(airportSaga), call(userSagas), call(flightSagas)]);
}
