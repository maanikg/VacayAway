import React from "react"
// import { useState } from "react"
export default function DestinationSelectedScreen(props) {
    const checkDepartureDate = (e) => {
        const departureDateParts = e.target.value.split("-")
        const departureYear = parseInt(departureDateParts[0])
        const departureMonth = parseInt(departureDateParts[1]) - 1
        const departureDay = parseInt(departureDateParts[2])
        const departureSelectedDate = new Date(departureYear, departureMonth, departureDay)
        if (departureSelectedDate < Date(Date.now())) {
            console.log("Please select a date in the future.")
            //CONFIGURE ALERT
            // alert("Please select a date in the future.")
        } else {
            console.log("Departure date is valid")
            props.setDepartureDate(departureSelectedDate)
        }
    }

    const checkReturnDate = (e) => {
        const returnDateParts = e.target.value.split("-")
        const returnYear = parseInt(returnDateParts[0])
        const returnMonth = parseInt(returnDateParts[1]) - 1
        const returnDay = parseInt(returnDateParts[2])
        const returnSelectedDate = new Date(returnYear, returnMonth, returnDay)
        console.log(returnSelectedDate)
        console.log(Date(Date.now()))
        if (returnSelectedDate < Date(Date.now())) { //THIS DOESN'T WORK
            alert("Please select a date in the future.")
            console.log("Please select a date in the future.")
            //CONFIGURE ALERT
            // alert("Please select a date in the future.")
        } else if (returnSelectedDate < props.departureDate) {
            console.log("Please select a date after your departure date.")
            //CONFIGURE ALERT
            // alert("Please select a date after your departure date.")
        } else {
            console.log("Return date is valid")
            props.setReturnDate(returnSelectedDate)
        }
    }

    const disableReturnDate = () => {
        const year1 = props.departureDate.getFullYear();
        const month1 = props.departureDate.getMonth();
        const day1 = props.departureDate.getDate();

        const now = new Date(Date.now())
        const year2 = now.getFullYear();
        const month2 = now.getMonth();
        const day2 = now.getDate();
        return year1 <= year2 && month1 <= month2 && day1 <= day2;
    }

    return (
        <div
            style={{
                display: props.display,
                backgroundColor: "lightgreen"
            }}
        >
            <div style={{ backgroundColor: "lightblue" }}>
                <p>
                    {props.departureDate.toString()}
                </p>
                <p>
                    {Date(Date.now())}
                </p>
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
            <div
                style={{ display: "flex" }}
            >
                <p>When do you want to go?</p>
                <input
                    type="date"
                    onChange={checkDepartureDate}
                />
            </div>
            <div
                style={{ display: "flex" }}
            >
                <p>When do you want to come back?</p>
                <input
                    type="date"
                    onChange={checkReturnDate}
                    disabled={disableReturnDate()}
                />
            </div>
        </div >
    )
}