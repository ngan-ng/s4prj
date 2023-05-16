import { all, call } from 'redux-saga/effects';
import { airportSaga } from './airport/airport.saga';

export function* rootSaga() {
    yield all([
        call(airportSaga),
    ]);
}