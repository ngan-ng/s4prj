import action_types from "./airport.type"

export const fetchAirportStart = () => ({
    type: action_types.FETCH_AIRPORT_START,
});
export const fetchAirportSuccess = (airports) => ({
    type: action_types.FETCH_AIRPORT_SUCCESS,
    payload: airports
});
export const fetchAirportFailed = (error) => ({
    type: action_types.FETCH_AIRPORT_FAILED,
    payload: error
});