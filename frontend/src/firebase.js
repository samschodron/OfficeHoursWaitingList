// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDLMzbkj1UUXR_kTsJANl8VJboaCxAUTRI",
    authDomain: "office-hours-waiting-list.firebaseapp.com",
    projectId: "office-hours-waiting-list",
    storageBucket: "office-hours-waiting-list.appspot.com",
    messagingSenderId: "677509719437",
    appId: "1:677509719437:web:a9a348682e2904432989c4",
    measurementId: "G-8NNXH7Q4CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;