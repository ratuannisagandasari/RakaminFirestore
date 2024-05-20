import { initializeApp } from 'firebase/app';
import { getFirestore , collection, addDoc, getDocs,deleteDoc,doc} from "firebase/firestore";


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2GKXg9wxiO-zJv4ZeHdmLKxxzW6h4ut4",
    authDomain: "odp-309.firebaseapp.com",
    projectId: "odp-309",
    storageBucket: "odp-309.appspot.com",
    messagingSenderId: "827573393612",
    appId: "1:827573393612:web:75c7d578a917dcf6444a69",
    measurementId: "G-DP1BDRCYG9"
  };

const app = initializeApp(firebaseConfig);
//inisialisasi DB fireStore
const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export {db, addDoc, collection, app, getDocs, doc, deleteDoc}