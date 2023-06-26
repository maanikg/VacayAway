import React from "react"
// import { useState } from "react"
export default function DestinationSelectedScreen(props) {
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