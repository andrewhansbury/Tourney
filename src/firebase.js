// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTg3lHCU0Sxq2HjZKHfDk2zrjK_IWIOR4",
  authDomain: "tourney-7a4ed.firebaseapp.com",
  databaseURL: "https://tourney-7a4ed-default-rtdb.firebaseio.com",
  projectId: "tourney-7a4ed",
  storageBucket: "tourney-7a4ed.appspot.com",
  messagingSenderId: "486762489064",
  appId: "1:486762489064:web:03a2cf3f2423979c54955d",
  measurementId: "G-TVH3Q3E1KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default getFirestore();