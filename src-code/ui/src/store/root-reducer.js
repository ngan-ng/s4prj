import { combineReducers } from 'redux';

// rootReducer import
import customizationReducer from './customizationReducer';
import { airportReducer } from './airport/airport.reducer';
import userReducer from './user/user.reducer';
import { flightReducer } from "./flight/flight.reducer";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  airports: airportReducer,
  user: userReducer,
  flight: flightReducer
});

export default rootReducer;
