import { combineReducers } from 'redux';

// rootReducer import
import customizationReducer from './customizationReducer';
import { userReducer } from './user/user.reducer';
import { airportReducer } from './airport/airport.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  airports: airportReducer,
  user: userReducer
});

export default rootReducer;
