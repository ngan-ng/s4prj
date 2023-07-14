import { FLIGHT_ACTION_TYPES } from './flight.types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axiosCall from '../../api/callAxios';
import { searchFlightFailed, searchFlightSuccess, selectDepartIdSuccess, selectFlightClear, selectReturnIdSuccess } from './flight.action';
import { clearPassengers } from 'store/passenger/passenger.action';

const searchFlight = async (searchDto) => {
  try {
    return await axiosCall.post('/api-v1/guest/flight/search', searchDto);
  } catch (error) {
    console.log(error);
  }
};

function* searchFlightStart({ payload }) {
  try {
    yield put(clearPassengers());
    const resp = yield call(searchFlight, payload);
    const data = resp.data;
    yield put(searchFlightSuccess(data));
  } catch (error) {
    yield put(searchFlightFailed(error));
  }
}

function* selectDepartIdStart({ payload }) {
  try {
    // yield put(clearPassengers());
    yield put(selectDepartIdSuccess(payload));
  } catch (error) {
    console.log('error', error);
  }
}

function* selectReturnIdStart({ payload }) {
  try {
    // yield put(clearPassengers());
    yield put(selectReturnIdSuccess(payload));
  } catch (error) {
    console.log('error', error);
  }
}

function* clear() {
  try {
    yield call(selectFlightClear);
  } catch (error) {
    console.log(error);
  }
}

export function* onSearchFlightStart() {
  yield takeLatest(FLIGHT_ACTION_TYPES.SEARCH_FLIGHT_START, searchFlightStart);
}

export function* onSelectDepartId() {
  yield takeLatest(FLIGHT_ACTION_TYPES.SELECT_DEPART_ID_START, selectDepartIdStart);
}

export function* onSelectReturnId() {
  yield takeLatest(FLIGHT_ACTION_TYPES.SELECT_RETURN_ID_START, selectReturnIdStart);
}

export function* onSelectFlightClear() {
  yield takeLatest(FLIGHT_ACTION_TYPES.SELECT_FLIGHT_CLEAR, clear);
}

export function* flightSagas() {
  yield all([call(onSearchFlightStart), call(onSelectDepartId), call(onSelectReturnId), call(onSelectFlightClear)]);
}
