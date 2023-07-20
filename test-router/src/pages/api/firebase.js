// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, ref, set, onValue, connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // apiKey: "AIzaSyBtd-Depovo-wEhTlI-j398qZeqxJ1FXcA",
    apiKey: "AIzaSyBtd-Depovo-wEhTlI-j398qZeqxJ1FXcA",
    authDomain: "vacayaway.firebaseapp.com",
    projectId: "vacayaway",
    storageBucket: "vacayaway.appspot.com",
    messagingSenderId: "983293492743",
    appId: "1:983293492743:web:a0471ea8d7e5b8e791b4a2",
    measurementId: "G-SJNKC5MLYE",
    // databaseURL: "https://vacayaway-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");
connectDatabaseEmulator(db, "localhost", 9000);

// export function getCityData(cityName) {
//     const countryRef = ref(db, 'places/' + cityName);// + '/country');
//     onValue(countryRef, (snapshot) => {
//         const data = snapshot.val();
//         alert(data.url)
//         // alert(data)
//     });
// }

// writeCityData('New York City', 'United States of America', '60763', 'https://media-cdn.tripadvisor.com/media/photo-s/1c/c5/7c/68/caption.jpg')
// writeCityData('Mexico City', 'Mexico', '150800', 'https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f3/96/caption.jpg')
// writeCityData('Tokyo', 'Japan', '298184', 'https://media-cdn.tripadvisor.com/media/photo-s/27/84/4b/d7/caption.jpg')
// getCityData('Tokyo')