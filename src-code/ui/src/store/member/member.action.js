import {MEMBER_ACTION_TYPES} from "./member.types";
import {createAction} from "../../utils/reducer.utils";


// member can be null or auth object
export const setCurrentMember = (member) =>
    createAction(MEMBER_ACTION_TYPES.SET_CURRENT_MEMBER, member);

export const checkMemberSession = () =>
    createAction(MEMBER_ACTION_TYPES.CHECK_MEMBER_SESSION);

export const googleSignInStart = () =>
    createAction(MEMBER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
    createAction(MEMBER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (member) =>
    createAction(MEMBER_ACTION_TYPES.SIGN_IN_SUCCESS, member);

export const signInFailed = (error) =>
    createAction(MEMBER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, firstName, lastName, displayName, mobile) =>
    createAction(MEMBER_ACTION_TYPES.SIGN_UP_START, {
        email,
        password,
        firstName,
        lastName,
        displayName,
        mobile
    });

export const signUpSuccess = (member, additionalDetails) =>
    createAction(MEMBER_ACTION_TYPES.SIGN_UP_SUCCESS, {member, additionalDetails});

export const signUpFailed = (error) =>
    createAction(MEMBER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
    createAction(MEMBER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
    createAction(MEMBER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
    createAction(MEMBER_ACTION_TYPES.SIGN_OUT_FAILED, error);
