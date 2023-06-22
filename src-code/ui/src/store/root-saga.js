import { all, call } from 'redux-saga/effects';
import { airportSaga } from './airport/airport.saga';
import { userSagas } from './user/user.sagas';
import { bookingSaga } from './booking/booking.saga';
// import { userSagas } from './user/user.saga';
import { flightSagas } from "./flight/flight.saga";

export function* rootSaga() {
  yield all([
      call(airportSaga),
      call(userSagas),
      call(bookingSaga),
      call(flightSagas)
  ]);
}
