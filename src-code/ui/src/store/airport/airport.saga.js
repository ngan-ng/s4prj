import { all, call, put, takeLatest } from 'redux-saga/effects';
import AIRPORT_ACTION_TYPES from './airport.type';
import { fetchAirportFailed, fetchAirportSuccess } from './airport.action';
// import axiosCall from 'api/axios';
import instance from 'api/callApiWithAzureAuth';

const getAirports = async () => {
  const resp = await instance.get('/api-v1/guest/airport/getAll');
  return resp;
};

export function* onFetchAirports() {
  yield takeLatest(AIRPORT_ACTION_TYPES.FETCH_AIRPORT_START, fetchAirportsAsync);
}

function* fetchAirportsAsync() {
  try {
    const resp = yield call(getAirports);
    yield put(fetchAirportSuccess({ data: resp.data }));
  } catch (error) {
    yield put(fetchAirportFailed(error));
  }
}

export function* airportSaga() {
  yield all([call(onFetchAirports)]);
}
