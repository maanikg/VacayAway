import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './css/App.css';
import HomeScreen from './pages/HomeScreen';
import Layout from './pages/Layout';
import NavigationBar from './pages/NavigationBar';
import NoPage from './pages/NoPage';
import Trips from './pages/Trips';
import LoadMap from "./pages/map/LoadMap";
import MapContainer from './pages/map/MapView';
import Plan from './pages/plan/Plan';

import { amadeusConfig } from "./pages/api/amadeusAPI";
import { lufthansaConfig } from "./pages/api/lufthansaAPI";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { auth, db } from "./pages/api/firebase.js";

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

	const monitorAuthState = async () => {
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
							loaded={loaded}
							setLoaded={setLoaded}
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