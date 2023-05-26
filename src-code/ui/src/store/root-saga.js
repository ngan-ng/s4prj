import { all, call } from 'redux-saga/effects';
import { airportSaga } from './airport/airport.saga';
import {memberSagas} from "./member/member.saga";
//import { adminSagas } from "./admin/admin.saga";

export function* rootSaga() {
    yield all([
        call(airportSaga),
        //call(adminSagas),
        call(memberSagas),
    ]);
}
