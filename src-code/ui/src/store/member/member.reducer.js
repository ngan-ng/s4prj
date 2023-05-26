import { MEMBER_ACTION_TYPES } from "./member.types";

const MEMBER_INITIAL_STATE = {
    currentMember: null,
    isLoading: false,
    error: null,
};

export const memberReducer = (state = MEMBER_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case MEMBER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state, // give the same value in previous state
                currentMember: payload, // anything after going to override
            };
        case MEMBER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentMember: null,
            };
        case MEMBER_ACTION_TYPES.SIGN_OUT_FAILED:
        case MEMBER_ACTION_TYPES.SIGN_IN_FAILED:
        case MEMBER_ACTION_TYPES.SIGN_UP_FAILED:
            return {
                ...state,
                error: payload,
            };
        default:
            // return the current state, exact same of previous state in memory,
            // this part of reducer didn't change, reducer doesn't need to update
            return state;
    }
};
