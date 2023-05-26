// Create app instance based of config.
// This config is object that allow to extract firebase app instance to instance that you have online, because now you have library install, but have no way tell firebase that this instance that you use should be referred to the one that you have created inside firebase console.

// Import the functions you need from the SDKs
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// auth service
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import {
    getFirestore,
    doc, // retrieve document inside database, get document instance
    getDoc, // access the data on that document
    setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// this instance created at the console
const firebaseConfig = {
    apiKey: "AIzaSyA98EmfPti0AmepvLE2PS5oeoubJ55gFCA",
    authDomain: "s4prj-c2d77.firebaseapp.com",
    projectId: "s4prj-c2d77",
    storageBucket: "s4prj-c2d77.appspot.com",
    messagingSenderId: "147010802404",
    appId: "1:147010802404:web:76531aa612d659ccde52f1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// can have multiple provider
const googleProvider = new GoogleAuthProvider();

// everytime, somebody interact with provider, always force them to select an account
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const createMemberProfileDocument = async (memberAuth, additionalData) => {
    if (!memberAuth) {
        return;
    }
    console.log("createMemberProfileDocument", memberAuth);
};

// auth is singleton because keep track the authentication state of entire app
export const auth = getAuth();

export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

// directly point to db inside firebase console
export const db = getFirestore();

export const createMemberDocumentFromAuth = async (
    memberAuth,
    additionalInfo = {}
) => {
    if (!memberAuth) {
        return;
    }

    // memberDocRef: pointer to the space that data could live
    const memberDocRef = doc(db, "members", memberAuth.uid);

    // check weather not there is an instance exist inside db
    const memberSnapshot = await getDoc(memberDocRef);

    //console.log(memberDocRef);
    //console.log(memberDocRef.exists());

    // if not exist then set it inside db
    if (!memberSnapshot.exists()) {
        const {displayName, email} = memberAuth;
        console.log(memberAuth);
        const createdAt = new Date();

        try {
            await setDoc(memberDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo, // override the value have in sign up form
            });
        } catch (error) {
            console.log("Create member failed", error.message);
        }
    }

    return memberSnapshot;
};

export const createAuthMemberWithEmailAndPassword = async (email, password) => {
    // if you don't receive any params then don't run function, in case refactor code
    if (!email || !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthMemberWithEmailAndPassword = async (email, password) => {
    console.log("signInAuthMemberWithEmailAndPassword", email);
    if (!email || !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutMember = async () => await signOut(auth);


// onAuthStateChanged call a callback whenever authentication state of auth singleton changes => when member sign-in then auth changes, sign-out that other changes, both time a callback is get involved

// if there is an active member that been authenticated already
export const getCurrentMember = () => {
    // resolve: go down the path when success retrieve the value that you want back
    // reject: get errors that you want to catch
    return new Promise((resolve, reject) => {
        // get back the unsubscribe from listener
        // this is promise, you don't want the listener stay active,
        // you want to unsubscribe at the moment, you get the value
        // onAuthStateChanged get back from firebase, it takes auth object and a callback
        const unsubscribe = onAuthStateChanged(
            auth,
            // callback give you a memberAuth, when it successfully gets the value, when it first initializes
            // the moment initializes and give you memberAuth, will know immediately from that memberAuth, weather or not already an existing member logged in
            // if there is or isn't, doesn't matter to you, key thing is you have a value
            (userAuth) => {
                // when have a value, immediately going to unsubscribe,
                // close the listener, if you don't do this, will be a memory leak,
                // meaning listener always active inside of firebase
                unsubscribe();
                // now you have the actual memberAuth
                // onAuthStateChanged is asynchronous, you're going to resolve the moment get the value anyway
                resolve(userAuth);
            },
            // third optional params, which callback run when an error is thrown in process when try to fetch memberAuth
            reject
        );
    });
};
