import { FLIGHT_ACTION_TYPES } from './flight.types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axiosCall from '../../api/callAxios';
import { searchFlightFailed, searchFlightSuccess, selectDepartIdSuccess, selectReturnIdSuccess } from './flight.action';

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

function* selectDepartIdStart({ payload }) {
  try {
    console.log('selectOutboundId', { payload });
    yield put(selectDepartIdSuccess(payload));
  } catch (error) {
    console.log('error', error);
  }
}

function* selectReturnIdStart({ payload }) {
  try {
    console.log('selectInboundId', { payload });
    yield put(selectReturnIdSuccess(payload));
  } catch (error) {
    console.log('error', error);
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

export function* flightSagas() {
  yield all([call(onSearchFlightStart), call(onSelectDepartId), call(onSelectReturnId)]);
}
