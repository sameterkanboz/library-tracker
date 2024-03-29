// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFUrVfiOBNypOPmnnH5cjDnDrIx4y5H8k",
  authDomain: "library-tracker-d1b5d.firebaseapp.com",
  projectId: "library-tracker-d1b5d",
  storageBucket: "library-tracker-d1b5d.appspot.com",
  messagingSenderId: "13704860849",
  appId: "1:13704860849:web:742325769d94333c537e90",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
