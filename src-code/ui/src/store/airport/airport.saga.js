import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../api/axios';
import AIRPORT_ACTION_TYPES from './airport.type';
import { fetchAirportFailed, fetchAirportSuccess } from './airport.action';

const getAirports = async () => {
  const resp = await axios.get('/api-v1/guest/airport/getAll');
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
