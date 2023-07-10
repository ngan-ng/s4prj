import { combineReducers } from 'redux';

// rootReducer import
import customizationReducer from './customizationReducer';
import { airportReducer } from './airport/airport.reducer';
import userReducer from './user/user.reducer';
import { flightReducer } from './flight/flight.reducer';
import { bookingReducer } from './booking/booking.reducer';
import { manageBookingReducer } from './manage-booking/mb.reducer';
import { seatReducer } from './seat/seat.reducer';
import { passengerReducer } from './passenger/passenger.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  airports: airportReducer,
  user: userReducer,
  bookings: bookingReducer,
  manageBookingObj: manageBookingReducer,
  seats: seatReducer,
  flights: flightReducer,
  passengers: passengerReducer
});

export default rootReducer;
