import {
    AuthErrorCodes,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth } from "../firebase.js"

import { useState, /*useRef, useEffect*/ } from "react";

export default function HomeScreen() {
    const [email, setEmail] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [outputMessage, setOutputMessage] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [authMessage, setAuthMessage] = useState("Don't have an account? Sign up here!")
    // const [error]

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
                console.log(userCredential.user)
                setOutputMessage("created new account! Welcome " +
                    userCredential.user.displayName === null ? userCredential.user.email : userCredential.user.displayName
                + "!");
                alert("created new account! Welcome " +
                    userCredential.user.displayName === null ? userCredential.user.email : userCredential.user.displayName
                + "!")
            } catch (error) {
                console.log(error)
                showLoginError(error)
            }
        }
    }

    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                // console.log(user)
                // setOutputMessage("Welcome " + user.displayName + "!")
            } else {

            }
        })
    }

    const logout = async () => {
        await signOut(auth)
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

    monitorAuthState()
    return (
        <div>
            {/* <h1>HomeScreen!</h1> */}
            <h1 style={{ backgroundColor: 'green' }}>Title</h1>

            <div>
                <button>Explore!</button>
            </div>
            <div>
                <button>Curate your plan</button>
            </div>
            <div>
                <button >My trips</button>
            </div>
            <div>
                <text style={{ textDecorationLine: "underline" }} onClick={switchAuth}>{authMessage}</text>
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
                    type="password"
                    placeholder="Password"
                    autoComplete="false"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                />
                {loggingIn ?
                    <input
                        name="passwordVerify"
                        type="password"
                        placeholder="Verify Password"
                        autoComplete="false"
                        value={passwordVerify}
                        onChange={(e) => setPasswordVerify(e.target.value)}
                    />
                    : null
                }
                <button onClick={!loggingIn ? loginEmailPassword : createUserEmailPassword}>
                    {!loggingIn ? "Log In" : "Sign Up"}
                </button>
                <div>{outputMessage}</div>
            </div>
        </div>
    );
}
