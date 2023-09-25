/* eslint-disable import/no-extraneous-dependencies */
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBUILLR77M_vl-_x87QMTM2b-nTaQTe-DE',
    authDomain: 'stock-os-8b274.firebaseapp.com',
    projectId: 'stock-os-8b274',
    storageBucket: 'stock-os-8b274.appspot.com',
    messagingSenderId: '976344351201',
    appId: '1:976344351201:web:61dd160e49aaf2bc7ed2a0',
    measurementId: 'G-9LSJL37K6E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
