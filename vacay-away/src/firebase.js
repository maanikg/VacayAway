// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtd-Depovo-wEhTlI-j398qZeqxJ1FXcA",
  authDomain: "vacayaway.firebaseapp.com",
  projectId: "vacayaway",
  storageBucket: "vacayaway.appspot.com",
  messagingSenderId: "983293492743",
  appId: "1:983293492743:web:a0471ea8d7e5b8e791b4a2",
  measurementId: "G-SJNKC5MLYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);