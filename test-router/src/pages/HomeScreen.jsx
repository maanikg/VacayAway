import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
// import { loginEmailPassword } from "../firebase.js"
import { auth } from "../firebase.js"
// import "../firebase.js"
import { Outlet, Link } from "react-router-dom";

import { useState } from "react";

export default function HomeScreen() {
    const [email, setEmail] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    //const [passwordVerify, setPasswordVerify] = useState("");
    const [outputMessage, setOutputMessage] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [authMessage, setAuthMessage] = useState("Don't have an account? Sign up here!")
    // const [error]

    const showLoginError = (error) => {
        if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
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
    function buttonClick() {

        // if (passwordInput != passwordVerify) {
        //     setOutputMessage("Passwords do not match");
        // } else {
        loginEmailPassword();
        // signInWithEmailAndPassword(email, passwordInput)
        // setOutputMessage("Hello " + username + "!");
        // setOutputMessage("verified! Welcome " + userCredential.user.displayName + "!");


        // }
    }
    function switchAuth() {
        setLoggingIn(!loggingIn)
        if (!loggingIn) {
            setAuthMessage("Don't have an account? Sign up here!")
        } else {
            setAuthMessage("Already have an account? Click here to log in.")
        }

    }

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
                <text onClick={switchAuth}>{authMessage}</text>
                {/* <li> */}
                {/* <Link to="/map">Already have an account? Sign in here</Link> */}
                {/* </li> */}
            </div>
            <div style={{ display: 'flex' }}>
                <input
                    name="usernameInput"
                    type="email"
                    placeholder="Email"
                    autoComplete="false"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    name="passwordInput"
                    type="password"
                    placeholder="Password"
                    autoComplete="false"
                    onChange={e => setPasswordInput(e.target.value)}
                />
                {/* <input
                    name="passwordVerify"
                    type="password"
                    placeholder="Verify Password"
                    autoComplete="false"
                    onChange={e => setPasswordVerify(e.target.value)}

                // onChange={e => {
                //     if (passwordInput.value != passwordVerify.value) {
                //         alert("Passwords do not match");
                //     }
                // }
                // }
                /> */}
                <button onClick={buttonClick} >Log In</button>
                <div>{outputMessage}</div>
            </div>
        </div>
    );
}
