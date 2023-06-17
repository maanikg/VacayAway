import React from "react";
import { useState } from "react";
export default function DestinationSelectedScreen(props) {
    return (
        <div
            style={{
                display: props.display,
                backgroundColor: "lightgreen"
            }}
        >
            <div style={{ backgroundColor: "lightblue" }}>
                <p>You have selected:</p>
                {
                    props.destArray.map((city) => {
                        return (
                            <div>
                                <p>{city.city}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div
                style={{ display: "flex" }}
            >
                <p>When do you want to go?</p>
                <input
                    type="date"
                />
            </div>
            <div
                style={{ display: "flex" }}
            >
                <p>When do you want to come back?</p>
                <input
                    type="date"
                />
            </div>
        </div >
    )
}