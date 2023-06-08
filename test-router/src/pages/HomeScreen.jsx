import { useState } from "react";
export default function HomeScreen() {
    const [username, setUsername] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [outputMessage, setOutputMessage] = useState("");
    function buttonClick() {
        if (passwordInput != passwordVerify) {
            setOutputMessage("Passwords do not match");
        } else {
            setOutputMessage("Hello " + username + "!");
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
            <div style={{ display: 'flex' }}>
                <input
                    name="usernameInput"
                    type="text"
                    placeholder="Username"
                    autoComplete="false"
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    name="passwordInput"
                    type="password"
                    placeholder="Password"
                    autoComplete="false"
                    onChange={e => setPasswordInput(e.target.value)}
                />
                <input
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
                />

                <button onClick={buttonClick} >Log In</button>
                <div>{outputMessage}</div>
            </div>
        </div>
    );
}
