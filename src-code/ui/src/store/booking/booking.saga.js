/* eslint-disable no-unused-vars */
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import BOOKING_ACTION_TYPES from './booking.type';
import axiosCall from 'api/callAxios';
import {
  b_clear,
  createBookingSuccess,
  createBookingFailed,
  fetchBookingByPnrFailed,
  fetchBookingByPnrSuccess
} from './booking.action';
import { selectDepartId, selectFlights, selectReturnId } from 'store/flight/flight.selector';
import { fetchBookingsStart } from 'store/itinerary/itinerary.action';
import { selectBookings } from './booking.selector';

const createBooking = async (bookings) => {
  const resp = await axiosCall.post('/api-v1/guest/booking/create', bookings);
  console.log('resp api', resp);
  return resp;
};

const getBookingsByPnr = async ({ pnr }) => {
  const resp = await axiosCall.get(`/api-v1/guest/booking/${pnr}`);
  return resp;
};

function* fetchBookingByPnrAsync({ payload }) {
  try {
    yield delay(3000);
    const resp = yield call(getBookingsByPnr, payload);
    yield put(fetchBookingByPnrSuccess(resp.data));
  } catch (error) {
    yield put(fetchBookingByPnrFailed(error));
  }
}

function* createBookingStart({ payload }) {
  try {
    const getDepartId = yield select(selectDepartId);
    const getReturnId = yield select(selectReturnId);
    const createdBooking = yield select(selectBookings);

    const getPnr = Object.keys(createdBooking).length > 0 ? createdBooking[0].pnr : '';
    console.log('PNR:: ', getPnr);
    let groupBookings = { bookings: [] };

    let arrADL = [];
    let arrCHD = [];
    let arrINF = [];

    arrADL = [...payload.bookings.filter((p) => p.gender === 'ADL')];
    arrCHD = [...payload.bookings.filter((p) => p.gender === 'CHD')];
    arrINF = [...payload.bookings.filter((p) => p.gender === 'INF')];

    let firstADL = arrADL[0];

    let tempINF = {};

    arrADL.map((item, index) => {
      arrINF.map((inf, i) => {
        if (inf.associate == index.toString()) {
          tempINF = inf;
        }
      });
    });

    arrADL.map((item, index) => {
      const { dob, email, firstName, gender, lastName, mobile, title } = item;

      if (tempINF.associate == index.toString()) {
        let objDepart = {
          loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
          flight: { ...item.flight, basePrice: 0.01, id: getDepartId },
          firstName: firstName,
          lastName: lastName,
          infant: { firstName: tempINF.firstName, lastName: tempINF.lastName, dob: tempINF.dob },
          gender: gender,
          bagAllowance: 0,
          email: firstADL.email,
          dob: dob,
          mobile: firstADL.mobile,
          title: title,
          pnr: getPnr
        };
        groupBookings.bookings.push(objDepart);
      } else {
        let objDepart = {
          loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
          flight: { ...item.flight, basePrice: 0.01, id: getDepartId },
          firstName: firstName,
          lastName: lastName,
          infant: null,
          gender: gender,
          bagAllowance: 0,
          email: firstADL.email,
          dob: dob,
          mobile: firstADL.mobile,
          title: title,
          pnr: getPnr
        };
        groupBookings.bookings.push(objDepart);
      }

      if (getReturnId != null) {
        if (tempINF.associate == index.toString()) {
          let objReturn = {
            loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
            flight: { ...item.flight, basePrice: 0.01, id: getReturnId },
            firstName: firstName,
            lastName: lastName,
            infant: { firstName: tempINF.firstName, lastName: tempINF.lastName, dob: tempINF.dob },
            gender: gender,
            bagAllowance: 0,
            email: firstADL.email,
            dob: dob,
            mobile: firstADL.mobile,
            title: title,
            pnr: getPnr
          };
          groupBookings.bookings.push(objReturn);
        } else {
          let objReturn = {
            loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
            flight: { ...item.flight, basePrice: 0.01, id: getReturnId },
            firstName: firstName,
            lastName: lastName,
            infant: null,
            gender: gender,
            bagAllowance: 0,
            email: firstADL.email,
            dob: dob,
            mobile: firstADL.mobile,
            title: title,
            pnr: getPnr
          };
          groupBookings.bookings.push(objReturn);
        }
      }
    });

    arrCHD.map((item) => {
      const { dob, email, firstName, gender, lastName, mobile, title } = item;

      let objDepart = {
        loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
        flight: { ...item.flight, basePrice: 0.01, id: getDepartId },
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        bagAllowance: 0,
        email: firstADL.email,
        dob: dob,
        mobile: firstADL.mobile,
        title: title
      };
      groupBookings.bookings.push(objDepart);

      if (getReturnId != null) {
        let objReturn = {
          loadSeatDto: { id: 0, seatNumber: '', price: 0, bookingId: 0 },
          flight: { ...item.flight, basePrice: 0.01, id: getReturnId },
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          bagAllowance: 0,
          email: firstADL.email,
          dob: dob,
          mobile: firstADL.mobile,
          title: title
        };
        groupBookings.bookings.push(objReturn);
      }
    });

    console.log('groupBookings', groupBookings);

    const resp = yield call(createBooking, groupBookings);
    yield put(createBookingSuccess(resp.data));
  } catch (error) {
    yield put(createBookingFailed(error));
  }
}

function* bookingClear() {
  try {
    yield call(b_clear);
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchBookingByPnr() {
  yield takeLatest(BOOKING_ACTION_TYPES.FETCH_BOOKING_BY_PNR_START, fetchBookingByPnrAsync);
}

export function* onCreateBookingStart() {
  yield takeLatest(BOOKING_ACTION_TYPES.CREATE_BOOKING_START, createBookingStart);
}

export function* onBookingClear() {
  yield takeLatest(BOOKING_ACTION_TYPES.BOOKING_CLEAR, bookingClear);
}

export function* bookingSaga() {
  yield all([call(onFetchBookingByPnr), call(onCreateBookingStart), call(onBookingClear)]);
}
