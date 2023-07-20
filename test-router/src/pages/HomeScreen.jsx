import { useNavigate } from "react-router-dom";
import {
    AuthErrorCodes,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth, db } from "./api/firebase.js";
import { ref, set } from "firebase/database";

import { useState, useEffect } from "react";

export default function HomeScreen(props) {
    // const props.loggedIn = useRef(auth.currentUser !== null);
    const [promptLoginTrue, setPromptLoginTrue] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [promptMessage, setPromptMessage] = useState("Please log in to continue.")
    const [authMessage, setAuthMessage] = useState("Don't have an account? Sign up here!")
    const [locationInput, setLocationInput] = useState("");
    // const [userLocation, setUserLocation] = useState({});
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const showLoginError = (error) => {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
            props.setOutputMessage("Wrong password, try again.")
        }
        else if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
            props.setOutputMessage("Email already exists. Please try again.")
        } else {
            props.setOutputMessage(error.message)

        }
    }

    const loginEmailPassword = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, props.email, props.passwordInput)
            props.setOutputMessage("verified! Welcome " + userCredential.user.displayName + "!");
        } catch (error) {
            showLoginError(error)
        }
    }

    const createUserEmailPassword = async () => {
        if (props.passwordInput !== props.passwordVerify) {
            props.setOutputMessage("Passwords do not match. Please try again.")
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, props.email, props.passwordInput)

                const userRef = ref(db, 'users/' + userCredential.user.uid)
                set(userRef, {
                    latitude: props.userLocation.latitude,
                    longitude: props.userLocation.longitude
                })

                // props.setOutputMessage("created new account! Welcome " +
                //     (userCredential.user.displayName === null ? userCredential.user.props.email : userCredential.user.displayName)
                //     + "!")
                alert("created new account! Welcome " +
                    (userCredential.user.displayName === null ? userCredential.user.props.email : userCredential.user.displayName)
                    + "!")
                // monitorAuthState()
            } catch (error) {
                showLoginError(error)
            }
        }
    }

    const logout = async () => {
        // alert(auth.currentUser.props.email)
        await signOut(auth)
        // alert(auth.currentUser)
        // monitorAuthState()
    }

    function switchAuth() {
        props.setLoggingIn(!props.loggingIn)
        props.setPasswordVerify("")
        props.setPasswordVerifyColour("white")
        props.setPasswordInput("")
        props.setEmail("")
        props.setUserLocation({})
        // setUserLocation(null)
        // dispatchEvent()
        if (props.loggingIn) {
            setAuthMessage("Don't have an account? Click here to sign up!")
        } else {
            setAuthMessage("Already have an account? Click here to log in.")
        }
    }
    //pass in paramater into function
    function promptLogin() {
        setPromptLoginTrue(!promptLoginTrue)
        setPrompt("trips")
        setPromptMessage("Please log in to view your trips")
    }

    useEffect(() => {
        props.setPasswordVerifyColour("white")
        props.monitorAuthState()
        // const monitorAuthState = async () => {
        const temp = async () => {
            onAuthStateChanged(auth, user => {
                if (user && prompt === "trips") {
                    navigate('/trips')
                }
            })
        }
        //         if (user) {
        //             setLoggedIn(true)
        //             props.setPasswordVerify("")
        //             props.setPasswordInput("")
        //             props.setEmail("")
        //             props.setOutputMessage("")
        //             locationSetter()
        //             if (prompt === "trips") {
        //                 navigate('/trips')
        //             }
        //             // props.setOutputMessage("Welcome " + user.displayName + "!")
        //         } else {

        //             // const tempLoggedIn = false
        //             // alert("logged out")
        //             // console.log("logged out")
        //             setLoggedIn(false)
        //             props.setPasswordVerify("")
        //             props.setPasswordInput("")
        //             props.setEmail("")
        //             props.setOutputMessage("")
        //             props.setUserLocation({})
        //         }
        //     })
        // }
        // console.log(auth.currentUser !== null ? auth.currentUser.props.email : "here: null")
        // props.monitorAuthState();
        // }, [navigate, prompt]);
        temp()
    }, [navigate, prompt]);


    function setLocation() {
        const options = {
            method: 'GET', headers: {
                accept: 'application/json',
                // origin: "http://localhost:3000",
                // referer: "http://localhost:3000"
            }
        };

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            // console.log(position.coords.latitude)
            // console.log(position.coords.longitude)
            props.setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            // setUserLocation(position.coords.latitude, position.coords.longitude)
            // setUserLocation(position.coords.latitude, position.coords.longitude)
            // fetch('https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=' + position.coords.latitude + '%2C' + position.coords.longitude + '&key=FAF9D5D1F9A94A7FB6C92E3DE7A5CF3C&radius=50&radiusUnit=km&language=en', options)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data)
            //     })
            //     // .then(response => console.log(response))
            //     .catch(err => console.error(err))
        })
    }


    return (


        <div>
            <div style={{ display: promptLoginTrue ? "none" : null }}>
                {/* <h1>HomeScreen!</h1> */}
                {/* <h1 style={{ backgroundColor: 'green' }}>{(auth.currentUser!==null).toString()}</h1> */}
                {/* <h1 style={{ backgroundColor: 'green' }}>{(props.loggedIn).toString()}</h1> */}
                <h1 style={{ backgroundColor: 'green' }}>Title </h1>
                <h2>{props.userLocation !== null ? "h1" + props.userLocation.latitude : null}</h2>
                <h2>{props.userLocation !== null ? "h2" + props.userLocation.longitude : null}</h2>
                {/* <h1 style={{ backgroundColor: 'green' }}>{(props.loggedIn).toString()} {auth.currentUser == null ? "null" : auth.currentUser.props.email}</h1> */}
                <div>
                    <button
                        onClick={
                            () => navigate('/map')
                        }
                    >Explore!</button>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/plan')}
                    >Curate your plan</button>
                </div>
                <div>
                    <button
                        onClick={() => props.loggedIn ? navigate('/trips') : promptLogin()}
                    >My trips</button>
                </div>
            </div>
            <div style={{ display: !promptLoginTrue ? "none" : null }}>
                {!props.loggedIn ?
                    <>
                        <div>
                            <p>{promptMessage}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <input
                                name="usernameInput"
                                type="props.email"
                                placeholder="Email"
                                autoComplete="false"
                                value={props.email}
                                onChange={e => props.setEmail(e.target.value)}
                            />
                            <input
                                name="props.passwordInput"
                                style={{ backgroundColor: props.passwordVerifyColour }}
                                type="password"
                                placeholder="Password"
                                autoComplete="false"
                                value={props.passwordInput}
                                onChange={e => {
                                    props.setPasswordInput(e.target.value)
                                    if (!props.loggingIn) {
                                        props.setPasswordVerifyColour("white")
                                    } else {
                                        if (!(e.target.value.length > 0 && props.passwordVerify.length > 0)) {
                                            props.setPasswordVerifyColour("white")
                                        } else if (e.target.value != props.passwordVerify) {
                                            props.setPasswordVerifyColour("red")
                                        } else {
                                            props.setPasswordVerifyColour("green")
                                        }
                                    }
                                }
                                }
                            />
                            {props.loggingIn ?
                                <input
                                    style={{
                                        backgroundColor: props.passwordVerifyColour
                                    }}
                                    name="props.passwordVerify"
                                    type="password"
                                    placeholder="Verify Password"
                                    autoComplete="false"
                                    value={props.passwordVerify}
                                    onChange={(e) => {
                                        props.setPasswordVerify(e.target.value)
                                        if (!(e.target.value.length > 0 && props.passwordInput.length > 0)) {
                                            props.setPasswordVerifyColour("white")
                                        } else if (e.target.value != props.passwordInput) {
                                            props.setPasswordVerifyColour("red")
                                        } else {
                                            props.setPasswordVerifyColour("green")
                                        }
                                    }
                                    }
                                />
                                : null
                            }
                            <button
                                style={{
                                    display: (props.loggingIn && props.passwordVerifyColour === "green" && props.userLocation !== null && props.email !== null && props.passwordInput !== null && "block")
                                        || (props.loggingIn && "none") || (!props.loggingIn && "block")
                                }}
                                onClick={!props.loggingIn ? loginEmailPassword : createUserEmailPassword}>
                                {!props.loggingIn ? "Log In" : "Sign Up"}
                            </button>
                            <div>{props.outputMessage}</div>
                        </div>
                        <div
                            style={{
                                display: props.loggingIn ? "flex" : "none"
                            }}>
                            <p>
                                Enter your location:
                                {props.userLocation ? " " + props.userLocation.latitude + ", " + props.userLocation.longitude : null}
                            </p>
                            <input
                                name="locationInput"
                                type="text"
                                placeholder="Location"
                                autoComplete="false"
                                onChange={e => setLocationInput(e.target.value)}
                                value={locationInput}
                            >
                            </input>
                            <button
                                onClick={setLocation}
                            >Use current location</button>
                        </div>
                        <div>
                            <p style={{ textDecorationLine: "underline" }} onClick={switchAuth}>{authMessage}</p>
                        </div>
                        <button onClick={() => {
                            setPromptLoginTrue(!promptLoginTrue)
                            props.setPasswordVerify("")
                            props.setPasswordInput("")
                            props.setEmail("")
                            props.setPasswordVerifyColour("white")
                            props.setLoggingIn(false)
                        }
                        }>Back</button>
                    </> : null
                }
            </div>
            {/* <Latitude /> */}
            {/* <p>
                {latitude}
                {longitude}
            </p> */}
            <div style={{ display: !props.loggedIn ? "none" : null }}>
                <button onClick={logout}>Log Out</button>
            </div>
            {/* <Outlet /> */}
        </div >

    );
}
