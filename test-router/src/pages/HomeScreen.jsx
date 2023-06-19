import { /*Outlet, Link, NavLink,*/ useNavigate } from "react-router-dom";
import {
    AuthErrorCodes,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification
    /*getAuth*/
} from "firebase/auth";
import { auth } from "./firebase.js"

import { useState,/* useRef,*/ useEffect } from "react";

export default function HomeScreen() {
    const [email, setEmail] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [passwordVerifyColour, setPasswordVerifyColour] = useState("white");
    const [outputMessage, setOutputMessage] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);
    // const loggedIn = useRef(auth.currentUser !== null);
    const [promptLoginTrue, setPromptLoginTrue] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [promptMessage, setPromptMessage] = useState("Please log in to continue.")
    const [authMessage, setAuthMessage] = useState("Don't have an account? Sign up here!")
    const navigate = useNavigate();

    const showLoginError = (error) => {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
            setOutputMessage("Wrong password, try again.")
        }
        else {
            setOutputMessage(error.message)
        }
    }

    const loginEmailPassword = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, passwordInput)
            console.log(userCredential.user)
            setOutputMessage("verified! Welcome " + userCredential.user.displayName + "!");
            // monitorAuthState()
        } catch (error) {
            console.log(error)
            showLoginError(error)
        }
    }

    const createUserEmailPassword = async () => {
        if (passwordInput !== passwordVerify) {
            setOutputMessage("Passwords do not match. Please try again.")
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, passwordInput)
                // sendEmailVerification(auth.currentUser)
                //     .then(() => {
                //     })
                console.log(userCredential.user)
                setOutputMessage("created new account! Welcome " +
                    userCredential.user.displayName === null ? userCredential.user.email : userCredential.user.displayName
                + "!");
                alert("created new account! Welcome " +
                    userCredential.user.displayName === null ? userCredential.user.email : userCredential.user.displayName
                + "!")
                // monitorAuthState()
            } catch (error) {
                console.log(error)
                showLoginError(error)
            }
        }
    }

    // const monitorAuthState = async () => {
    //     onAuthStateChanged(auth, user => {
    //         if (user) {
    //             // const tempLoggedIn = true
    //             setLoggedIn(true)
    //             console.log(user)
    //             // loggedIn.current = true
    //             setPasswordVerify("")
    //             setPasswordInput("")
    //             setEmail("")
    //             setOutputMessage("")
    //             if (prompt === "trips") {
    //                 navigate('/trips')
    //             }
    //             // setOutputMessage("Welcome " + user.displayName + "!")
    //         } else {

    //             // const tempLoggedIn = false
    //             // alert("logged out")
    //             // console.log("logged out")
    //             // loggedIn.current = false
    //             setLoggedIn(false)
    //             // setLoggedIn(tempLoggedIn)
    //             setPasswordVerify("")
    //             setPasswordInput("")
    //             setEmail("")
    //             setOutputMessage("")
    //         }
    //     })
    // }

    const logout = async () => {
        // alert(auth.currentUser.email)
        await signOut(auth)
        // alert(auth.currentUser)
        // monitorAuthState()
    }

    function switchAuth() {
        setLoggingIn(!loggingIn)
        setPasswordVerify("")
        setPasswordInput("")
        setEmail("")
        // dispatchEvent()
        if (loggingIn) {
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
        const monitorAuthState = async () => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    // const tempLoggedIn = true
                    setLoggedIn(true)
                    console.log(user)
                    // loggedIn.current = true
                    setPasswordVerify("")
                    setPasswordInput("")
                    setEmail("")
                    setOutputMessage("")
                    if (prompt === "trips") {
                        navigate('/trips')
                    }
                    // setOutputMessage("Welcome " + user.displayName + "!")
                } else {

                    // const tempLoggedIn = false
                    // alert("logged out")
                    // console.log("logged out")
                    // loggedIn.current = false
                    setLoggedIn(false)
                    // setLoggedIn(tempLoggedIn)
                    setPasswordVerify("")
                    setPasswordInput("")
                    setEmail("")
                    setOutputMessage("")
                }
            })
        }
        // console.log(auth.currentUser !== null ? auth.currentUser.email : "here: null")
        monitorAuthState();
        // console.log(auth.currentUser !== null ? auth.currentUser.email : "here: null")
    }, [navigate, prompt]);
    // monitorAuthState()
    return (


        // { monitorAuthState() }
        <div>
            <div style={{ display: promptLoginTrue ? "none" : null }}>
                {/* <h1>HomeScreen!</h1> */}
                {/* <h1 style={{ backgroundColor: 'green' }}>{(auth.currentUser!==null).toString()}</h1> */}
                {/* <h1 style={{ backgroundColor: 'green' }}>{(loggedIn).toString()}</h1> */}
                <h1 style={{ backgroundColor: 'green' }}>Title</h1>
                {/* <h1 style={{ backgroundColor: 'green' }}>{(loggedIn).toString()} {auth.currentUser == null ? "null" : auth.currentUser.email}</h1> */}
                <div>
                    <button
                        onClick={() => navigate('/map')}
                    >Explore!</button>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/plan')}
                    >Curate your plan</button>
                </div>
                <div>
                    <button
                        onClick={() => loggedIn ? navigate('/trips') : promptLogin()}
                    >My trips</button>
                </div>
            </div>
            <div style={{ display: !promptLoginTrue ? "none" : null }}>
                {!loggedIn ?
                    <>
                        <div>
                            <p>{promptMessage}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <input
                                name="usernameInput"
                                type="email"
                                placeholder="Email"
                                autoComplete="false"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                name="passwordInput"
                                style={{ backgroundColor: passwordVerifyColour }}
                                type="password"
                                placeholder="Password"
                                autoComplete="false"
                                value={passwordInput}
                                onChange={e => {
                                    setPasswordInput(e.target.value)
                                    if (!loggingIn) {
                                        setPasswordVerifyColour("white")
                                    } else {
                                        if (!(e.target.value.length > 0 && passwordVerify.length > 0)) {
                                            setPasswordVerifyColour("white")
                                        } else if (e.target.value != passwordVerify) {
                                            setPasswordVerifyColour("red")
                                        } else {
                                            setPasswordVerifyColour("green")
                                        }
                                    }
                                }
                                }
                            />
                            {loggingIn ?
                                <input
                                    style={{
                                        backgroundColor: passwordVerifyColour
                                    }}
                                    name="passwordVerify"
                                    type="password"
                                    placeholder="Verify Password"
                                    autoComplete="false"
                                    value={passwordVerify}
                                    onChange={(e) => {
                                        setPasswordVerify(e.target.value)
                                        if (!(e.target.value.length > 0 && passwordInput.length > 0)) {
                                            setPasswordVerifyColour("white")
                                        } else if (e.target.value != passwordInput) {
                                            setPasswordVerifyColour("red")
                                        } else {
                                            setPasswordVerifyColour("green")
                                        }
                                    }
                                    }
                                />
                                : null
                            }
                            <button onClick={!loggingIn ? loginEmailPassword : createUserEmailPassword}>
                                {!loggingIn ? "Log In" : "Sign Up"}
                            </button>
                            <div>{outputMessage}</div>
                        </div>
                        <div>
                            <p style={{ textDecorationLine: "underline" }} onClick={switchAuth}>{authMessage}</p>
                        </div>
                        <button onClick={() =>
                            setPromptLoginTrue(!promptLoginTrue)
                        }>Back</button>
                    </> : null
                }
            </div>
            <div style={{ display: !loggedIn ? "none" : null }}>
                <button onClick={logout}>Log Out</button>
            </div>
            {/* <Outlet /> */}
        </div >

    );
}
