/* eslint-disable no-unused-vars */
import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { clearPassengers, createPassengerFailed, createPassengerSuccess } from './passenger.action';
import { PASSENGER_ACTION_TYPES } from './passenger.types';
import axiosCall from 'api/callAxios';

// const createPassenger = async (passenger) => {
//   console.log('api', passenger);
//   const resp = await axiosCall.post('/api-v1/guest/booking/create', passenger);
//   console.log(resp);
//   return resp;
// };

export function* createPassengerAsync({ payload }) {
  try {
    let temp = null;

    var arrADL = [];
    let arrCHD = [];
    let arrINF = [];
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].gender === 'ADL') {
        const { dob, email, firstName, gender, lastName, mobile, title } = payload[i];
        let obj = {};
        obj['id'] = 0;
        obj['flight'] = {
          id: 1
        };
        obj['dob'] = dob;
        obj['email'] = email;
        obj['firstName'] = firstName;
        obj['gender'] = gender;
        obj['lastName'] = lastName;
        obj['mobile'] = mobile;
        obj['title'] = title;
        obj['bag_allowance'] = 0.0;

        arrADL.push(obj);
      }

      if (payload[i].gender === 'CHD') {
        const { dob, email, firstName, gender, lastName, mobile, title } = payload[i];
        const jsonCHD = {
          id: 0,
          flight: {
            id: 1
          },
          dob: dob,
          title: title,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          mobile: mobile,
          email: email,
          bag_allowance: 0.0
        };
        arrCHD.push(jsonCHD);
      }

      if (payload[i].gender === 'INF') {
        const { dob, email, firstName, gender, lastName, mobile, title } = payload[i];
        const jsonINF = {
          id: 0,
          flight: {
            id: 1
          },
          dob: dob,
          title: title,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          mobile: mobile,
          email: email,
          bag_allowance: 0.0
        };
        arrINF.push(jsonINF);
      }
    }
    console.log(arrADL);

    arrADL.map((item, index) => {
      const jsonBookings = {
        bookings: [item]
      };
      temp = jsonBookings;
    });
    console.log(temp);

    //yield call(createPassenger, aaa);
    yield put(createPassengerSuccess(payload));
  } catch (error) {
    yield put(createPassengerFailed(error));
  }
}

export function* clear() {
  yield call(clearPassengers);
}
export function* onCreatePassengerStart() {
  yield takeLatest(PASSENGER_ACTION_TYPES.CREATE_PASSENGER_START, createPassengerAsync);
}
export function* onClearPax() {
  yield takeLatest(PASSENGER_ACTION_TYPES.CLEAR_PASSENGERS, clear);
}
export function* passengerSagas() {
  yield all([call(onCreatePassengerStart, call[onClearPax])]);
}
