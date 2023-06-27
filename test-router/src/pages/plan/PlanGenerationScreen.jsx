import { /*Outlet, Link, NavLink,*/ useNavigate } from "react-router-dom";
import React from "react"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { useState } from "react"
export default function DestinationSelectedScreen(props) {
    const navigate = useNavigate();
    useEffect(() => {
        props.monitorAuthState()
        //     const monitorAuthState = async () => {
        //         onAuthStateChanged(auth, user => {
        //             if (user) {
        //                 locationSetter()
        //             }
        //         })
        //     }
    }, [navigate])

    return (
        <div
            style={{
                display: props.display,
                backgroundColor: "purple"
            }}
        >
            <div style={{ backgroundColor: "lightblue" }}>
                <p>You have selected:</p>
                {
                    props.destArray.map((city) => {
                        return (
                            <div key={city.key}>
                                <p>{city.city}</p>
                                <p>{city.latitude}</p>
                                <p>{city.longitude}</p>
                                <p>Hi</p>
                                <p>{props.userLocation.latitude}</p>
                                <p>{props.userLocation.longitude}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div
                    style={{ display: "flex" }}
                >
                    <p>Dates:</p>
                    <p>{props.departureDate.toString()}</p>
                    <p>{props.returnDate.toString()}</p>
                </div>
                <div
                    style={{ display: "flex" }}
                >
                    <p>When do you want to come back?</p>
                </div>
            </div>
        </div >
    )
}