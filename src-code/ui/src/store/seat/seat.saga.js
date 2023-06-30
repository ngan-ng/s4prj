import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SEAT_ACTION_TYPES } from './seat.types';
import axiosCall from 'api/callAxios';
import { clearSeats, fetchSeatsFailed, fetchSeatsSuccess } from './seat.action';

const getSeatsByFlightId = async (flightId) => {
  console.log('FlightId 2: ');
  console.log(flightId);
  const resp = await axiosCall.get(`/api-v1/guest/seat/getAllByFlight/${flightId}`);
  if (resp.status === 200) {
    return resp.data;
  } else {
    throw new Error('Cannot get seats right now');
  }
};

function* fetchSeatsStartAsync({ payload }) {
  try {
    console.log('FlightId 1: ');
    console.log(payload);
    const seats = yield call(getSeatsByFlightId, payload);
    if (seats === null || seats.length === 0) {
      yield put(fetchSeatsFailed('Not found'));
    } else {
      yield put(fetchSeatsSuccess(seats));
    }
  } catch (error) {
    yield put(fetchSeatsFailed(error));
  }
}
function* clear() {
  yield call(clearSeats);
}
export function* onFetchSeatsStart() {
  yield takeLatest(SEAT_ACTION_TYPES.FETCH_SEATS_START, fetchSeatsStartAsync);
}
export function* onClearSeat() {
  yield takeLatest(SEAT_ACTION_TYPES.CLEAR_SEATS, clear);
}
export function* seatSaga() {
  yield all([call(onClearSeat), call(onFetchSeatsStart)]);
}
