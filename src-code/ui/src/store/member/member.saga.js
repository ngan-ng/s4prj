import { takeLatest, put, all, call } from "redux-saga/effects";

import { MEMBER_ACTION_TYPES } from "./member.types";

import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
} from "./member.action";

import {
    getCurrentMember,
    createMemberDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthMemberWithEmailAndPassword,
    createAuthMemberWithEmailAndPassword,
    signOutMember,
} from "../../utils/firebase/firebase.utils";


export function* getSnapshotFromMemberAuth(memberAuth, additionalDetails) {
    try {
        // call():
        // you get some object where the function's name is createMemberDocumentFromAuth
        // then params: [] - whatever the subsequence are
        const memberSnapshot = yield call(
            createMemberDocumentFromAuth,
            memberAuth,
            additionalDetails
        );
        console.log("memberSnapshot: ", memberSnapshot);
        yield put(signInSuccess({ id: memberSnapshot.id, ...memberSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { member } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromMemberAuth, member);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { member } = yield call(
            signInAuthMemberWithEmailAndPassword,
            email,
            password
        );
        console.log("signInWithEmail: ", member);
        yield call(getSnapshotFromMemberAuth, member);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isMemberAuthenticated() {
    try {
        // memberAuth can null: no sign-in or no authenticate member
        const memberAuth = yield call(getCurrentMember);
        if (!memberAuth) {
            return;
        }
        yield call(getSnapshotFromMemberAuth, memberAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload: { email, password, firstName, lastName, displayName, mobile } }) {
    try {
        const { member } = yield call(
            createAuthMemberWithEmailAndPassword,
            email,
            password,
        );
        yield put(signUpSuccess(member, {firstName, lastName, displayName, mobile}));

    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutMember);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* storeAdditionalDetailsAfterSignUp({ payload: { member, additionalDetails } }) {
    console.log({ member, additionalDetails });
    yield call(getSnapshotFromMemberAuth, member, additionalDetails);
}

export function* onGoogleSignInStart() {
    yield takeLatest(MEMBER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckMemberSession() {
    yield takeLatest(MEMBER_ACTION_TYPES.CHECK_MEMBER_SESSION, isMemberAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(MEMBER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(MEMBER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(MEMBER_ACTION_TYPES.SIGN_UP_SUCCESS, storeAdditionalDetailsAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(MEMBER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* memberSagas() {
    yield all([
        call(onCheckMemberSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
