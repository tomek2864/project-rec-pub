import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

let firebaseApp: FirebaseApp;

export const setupFirebase = () => {
    try {
        firebaseApp = initializeApp({
            apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
            databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
            projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
            appId: import.meta.env.VITE_FIREBASE_APPID,
        });
    } catch (error) {
        console.error({ error })
    }
};

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;

export const useAuth = () => {
    auth = getAuth(firebaseApp);
    return auth;
};

export const useFirestore = () => {
    firestore = getFirestore();
    return firestore;
};