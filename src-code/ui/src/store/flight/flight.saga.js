import { FLIGHT_ACTION_TYPES } from './flight.types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axiosCall from '../../api/callAxios';
import { searchFlightFailed, searchFlightSuccess } from './flight.action';

const searchFlight = async (searchDto) => {
  try {
    return await axiosCall.post('/api-v1/guest/flight/search', searchDto);
  } catch (error) {
    console.log(error);
  }
};

function* searchFlightStart({ payload }) {
  try {
    const resp = yield call(searchFlight, payload);
    const data = resp.data;
    yield put(searchFlightSuccess(data));
  } catch (error) {
    yield put(searchFlightFailed(error));
  }
}

export function* onSearchFlightStart() {
  yield takeLatest(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_START, searchFlightStart);
}

export function* flightSagas() {
  yield all([call(onSearchFlightStart)]);
}
