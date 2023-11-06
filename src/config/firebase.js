// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwP84Dt-U7_F-yiQ9_BwN70HkCaN8pRAM",
  authDomain: "react-contact-e4c1e.firebaseapp.com",
  projectId: "react-contact-e4c1e",
  storageBucket: "react-contact-e4c1e.appspot.com",
  messagingSenderId: "298525970606",
  appId: "1:298525970606:web:f52e4bd21c8f35db3add3f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
