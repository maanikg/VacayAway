import MapContainer from './pages/map/MapView';
import HomeScreen from './pages/HomeScreen';
import NoPage from './pages/NoPage';
import NavigationBar from './pages/NavigationBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import './css/App.css';
import Trips from './pages/Trips';
import Plan from './pages/plan/Plan';
import { useState } from 'react';
import { amadeusConfig } from "./pages/api/amadeusAPI";
import { lufthansaConfig } from "./pages/api/lufthansaAPI";
import LoadMap from "./pages/map/LoadMap";

import {
	onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "./pages/api/firebase.js";
import { ref, onValue } from "firebase/database";

export default function App() {
	const [userLocation, setUserLocation] = useState({});
	const [email, setEmail] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [passwordVerify, setPasswordVerify] = useState("");
	const [passwordVerifyColour, setPasswordVerifyColour] = useState("white");
	const [outputMessage, setOutputMessage] = useState("");
	const [loggingIn, setLoggingIn] = useState(false);
	const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);
	const [lufthansaAccessToken, setLufthansaAccessToken] = useState('')
	const [amadeusAccessToken, setAmadeusAccessToken] = useState('')
	const [loaded, setLoaded] = useState(false)

	function locationSetter() {
		console.log("loc")
		const latitutdeRef = ref(db, 'users/' + auth.currentUser.uid + '/latitude')
		const longitudeRef = ref(db, 'users/' + auth.currentUser.uid + '/longitude')
		onValue(latitutdeRef, (snapshot) => {
			setUserLocation(userLocation => ({
				...userLocation,
				latitude: snapshot.val()
			}))
		})
		onValue(longitudeRef, (snapshot) => {
			setUserLocation(userLocation => ({
				...userLocation,
				longitude: snapshot.val()
			}))
		})
	}
	function setupLufthansaAPI() {
		console.log("luft")
		fetch(lufthansaConfig.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(lufthansaConfig.data)
		})
			.then(response => response.json())
			.then(data => {
				setLufthansaAccessToken(data.access_token)
				console.log("luft" + data.access_token)
			})
			.catch(error => {
				alert(error)
			});
	}
	function setupAmadeusAPI() {
		console.log("amadeus")
		fetch(amadeusConfig.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(amadeusConfig.data)
		})
			.then(response => response.json())
			.then(data => {
				setAmadeusAccessToken(data.access_token)
				console.log("amadeus" + data.access_token)
			})
			.catch(error => {
				alert(error);
			});
	}

	// <script async
	// 	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc&libraries=places">
	// </script>
	// console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

	const monitorAuthState = async () => {
		console.log("here")
		onAuthStateChanged(auth, user => {
			if (user) {
				setLoggedIn(true)
				setPasswordVerify("")
				setPasswordInput("")
				setEmail("")
				setOutputMessage("")
				locationSetter()
				setupLufthansaAPI()
				setupAmadeusAPI()

				// if (prompt === "trips") {
				// navigate('/trips')
				// }
				// setOutputMessage("Welcome " + user.displayName + "!")
			} else {

				// const tempLoggedIn = false
				// alert("logged out")
				// console.log("logged out")
				setLoggedIn(false)
				setPasswordVerify("")
				setPasswordInput("")
				setEmail("")
				setOutputMessage("")
				setUserLocation({})
			}
		})
	}
	return (
		// <div style={{ backgroundColor: "blue" }}>
		<div>
			<NavigationBar />
			<LoadMap
				loaded={loaded}
				setLoaded={setLoaded}
			/>
			<BrowserRouter>
				<Routes>
					{/* <Route index */}
					{/* <Route path="/" element={<Layout />}> */}
					<Route path="/" element={<Layout />}>
						{/* <button>onClick={() => navigate('/trips')}</button> */}

						{/* <Route path="/" element={<HomeScreen />}> */}
						<Route index element={<HomeScreen
							userLocation={userLocation}
							setUserLocation={setUserLocation}
							monitorAuthState={monitorAuthState}
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
							email={email}
							setEmail={setEmail}
							passwordInput={passwordInput}
							setPasswordInput={setPasswordInput}
							passwordVerify={passwordVerify}
							setPasswordVerify={setPasswordVerify}
							passwordVerifyColour={passwordVerifyColour}
							setPasswordVerifyColour={setPasswordVerifyColour}
							outputMessage={outputMessage}
							setOutputMessage={setOutputMessage}
							loggingIn={loggingIn}
							setLoggingIn={setLoggingIn}
						/>} />
						{/* <Route path="auth" element={<AuthPage />} /> */}
						<Route path="map" caseSensitive={true} element={<MapContainer
							userLocation={userLocation}
							loaded={loaded}
							setLoaded={setLoaded}
						/>} />
						<Route path="plan" caseSensitive={true} element={<Plan
							userLocation={userLocation}
							monitorAuthState={monitorAuthState}
							lufthansaAccessToken={lufthansaAccessToken}
							setLufthansaAccessToken={setLufthansaAccessToken}
							amadeusAccessToken={amadeusAccessToken}
							setAmadeusAccessToken={setAmadeusAccessToken}
						/>} />
						<Route path="trips" caseSensitive={true} element={<Trips />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
			{/* </div> */}
		</div >
	);
}