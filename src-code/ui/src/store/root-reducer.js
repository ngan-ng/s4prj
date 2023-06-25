import { combineReducers } from 'redux';

// rootReducer import
import customizationReducer from './customizationReducer';
import { airportReducer } from './airport/airport.reducer';
import userReducer from './user/user.reducer';
import { bookingReducer } from './booking/booking.reducer';
import { manageBookingReducer } from './manage-booking/mb.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  airports: airportReducer,
  user: userReducer,
  bookings: bookingReducer,
  manageBookingObj: manageBookingReducer
});

export default rootReducer;
