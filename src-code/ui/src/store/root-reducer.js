import { combineReducers } from 'redux';
import { airpotReducer } from './airport/airport.reducer';

export const rootReducer = combineReducers({
    airports: airpotReducer,
});