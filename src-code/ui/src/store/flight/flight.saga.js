import {FLIGHT_ACTION_TYPES} from "./flight.types";
import {takeLatest, put, all, call} from 'redux-saga/effects';
import {sendSearchDtoFailed, sendSearchDtoSuccess} from "./flight.action";
import axiosCall from "../../api/callAxios";

const searchFlight = async (searchDto) => {
    const resp = await axiosCall.post("/api-v1/guest/flight/search", searchDto)
        .then((resp) => {
            console.log(resp);
        })
        .catch((error) => {
            console.log(error);
        });
    return resp;
}

function* sendSearchDtoStart({payload}) {
    try {
        yield call(searchFlight, payload);
        const resp = yield call(searchFlight);
        yield put(sendSearchDtoSuccess({data: resp.data}));
    } catch (error) {
        yield put(sendSearchDtoFailed(error));
    }
}

// function* navigateToBooking({payload}) {
//     try {
//
//     } catch (error) {
//
//     }
// }

export function* onSendSearchDtoStart() {
    yield takeLatest(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_START, sendSearchDtoStart);
}

// export function* onSendSearchDtoSuccess() {
//     yield takeLatest(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_START, navigateToBooking);
// }

export function* flightSagas() {
    yield all([
        call(onSendSearchDtoStart),
        //call(onSendSearchDtoSuccess),
    ]);
}
