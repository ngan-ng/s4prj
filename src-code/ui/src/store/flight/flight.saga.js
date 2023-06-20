import {FLIGHT_ACTION_TYPES} from "./flight.types";
import {takeLatest, put, all, call} from 'redux-saga/effects';
import {sendSearchDtoFailed, sendSearchDtoSuccess} from "./flight.action";
import axiosCall from "../../api/axios";

const searchFlight = async (searchDto) => {
    const data = await axiosCall.post("/api-v1/guest/flight/search-flight", searchDto)
        .then((resp) => {
            console.log(resp);
        })
        .catch((error) => {
            console.log(error);
        });

    console.log("data:", data);
    return data;

}

function* sendSearchDtoStart({payload}) {
    try {
        yield call(searchFlight, payload);
        yield put(sendSearchDtoSuccess(payload))
    } catch (error) {
        yield put(sendSearchDtoFailed(error));
    }
}

export function* onSendSearchDtoStart() {
    yield takeLatest(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_START, sendSearchDtoStart);
}

export function* flightSagas() {
    yield all([call(onSendSearchDtoStart)]);
}
