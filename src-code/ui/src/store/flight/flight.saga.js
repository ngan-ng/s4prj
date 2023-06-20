import {FLIGHT_ACTION_TYPES} from "./flight.types";
import { takeLatest, put, all, call } from 'redux-saga/effects';
import {sendSearchDtoFailed} from "./flight.action";
import axiosCall from "../../api/axios";

const searchFlight = async (origin, destination, departDate, returnDate, tripType) => {
    //console.log("axios", {payload});
    // const resp = await axiosCall({
    //     method: "POST",
    //     url: "/api-v1/guest/flight/search-flight",
    //     data: {
    //         "origin": origin,
    //         "destination": destination,
    //         "departDate": departDate,
    //         "returnDate": returnDate,
    //         "tripType": tripType
    //     }
    // });
    const resp = await axiosCall.post("/api-v1/guest/flight/search-flight", {
        origin,
        destination,
        departDate,
        returnDate,
        tripType
    });
    return resp;
}

function* sendSearchDtoStart(origin, destination, departDate, returnDate, tripType) {
    try {
        yield call(searchFlight(origin, destination, departDate, returnDate, tripType));
    } catch (error) {
        yield put(sendSearchDtoFailed(error));
    }
}

export function* onSendSearchDtoStart() {
    yield takeLatest(FLIGHT_ACTION_TYPES.SEND_SEARCHDTO_START, sendSearchDtoStart);
}

export function* flightSaga() {
    yield all([call(onSendSearchDtoStart)]);
}
