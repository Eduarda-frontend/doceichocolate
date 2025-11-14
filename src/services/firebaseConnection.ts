// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBo8CdifeoISx2oDNdsQn6iX8pqv8VcQnw",
  authDomain: "doceichocolate-cdc14.firebaseapp.com",
  projectId: "doceichocolate-cdc14",
  storageBucket: "doceichocolate-cdc14.appspot.com",
  messagingSenderId: "213212039924",
  appId: "1:213212039924:web:4bfdffed90df7759862ca1",
  measurementId: "G-5BH68B7PLW"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://doceichocolate-cdc14.appspot.com");

export { auth, db, storage }
