import React, { useState, useEffect } from 'react';
//import styles3.css
import "../css/styles3.css"
// import usericon from "../public/userIcon.png"

export default function NavigationBar() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup the timer on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            backgroundColor: '#fe773d',
            display: 'flex'
        }}>
            <h1>VacayAway</h1>
            {/* <div style={{
                display: 'flex',
            }}> */}
            <main style={{ display: 'flex' }}>
                <article>
                    <h2>Explore</h2>
                </article>
                <article>
                    <h2>Plan</h2>
                </article>
                <article>
                    <h2>Archive</h2>
                </article>
                <article>

                    {/* <img src=".../"></img> */}

                    {/* <h2 ></h2> */}
                </article>
            </main>
            {/* <button>Explore</button>
            <button>Plan</button>
            <button>Archive</button> */}

            <p>{currentDateTime.toLocaleTimeString()}</p>
            <p>{currentDateTime.toLocaleDateString()}</p>
        </div>

    );
}