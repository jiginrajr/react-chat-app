// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFireStore } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJRtX9ZGHQEP1c-pcrCPv3xp5Xd4zobJ8",
  authDomain: "chatapp-b4722.firebaseapp.com",
  projectId: "chatapp-b4722",
  storageBucket: "chatapp-b4722.appspot.com",
  messagingSenderId: "209622094984",
  appId: "1:209622094984:web:e9ebdb93b26e3116d1fb3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);