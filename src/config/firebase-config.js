// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsATMSaLZ55OzzpFV-9_oix1QgoaLbaJU",
  authDomain: "library-management-e84f8.firebaseapp.com",
  projectId: "library-management-e84f8",
  storageBucket: "library-management-e84f8.appspot.com",
  messagingSenderId: "260450328155",
  appId: "1:260450328155:web:ba151a23dd44b8fdf9697e",
  measurementId: "G-LDP9PX1TBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);