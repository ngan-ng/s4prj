import { all, call, take } from 'redux-saga/effects';
import MB_ACTION_TYPE from './mb.type';
import { mb_selectFlightSuccess } from './mb.action';

function* selectFlight({ payload }) {
  try {
    yield call(mb_selectFlightSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

export function* manageBookingSelectFlight() {
  console.log('Yield TakeLatest');
  yield take(MB_ACTION_TYPE.SELECT_FLIGHT_SUCCESS, selectFlight);
}

export function* manage_bookingSaga() {
  yield all([call(manageBookingSelectFlight)]);
}
