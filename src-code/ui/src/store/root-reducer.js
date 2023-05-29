import { combineReducers } from 'redux';
import { airpotReducer } from './airport/airport.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    airports: airpotReducer,
    user: userReducer,
});
