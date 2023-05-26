import { combineReducers } from 'redux';
import { airpotReducer } from './airport/airport.reducer';
import {memberReducer} from "./member/member.reducer";
//import { adminReducer } from "./admin/admin.reducer";

export const rootReducer = combineReducers({
    airports: airpotReducer,
    //admin: adminReducer,
    member: memberReducer,
});
