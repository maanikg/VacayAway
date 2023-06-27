import { /*Outlet, Link, NavLink,*/ useNavigate } from "react-router-dom";
import React from "react"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { lufthansaConfig } from "../lufthansaAPI";
import { useState } from "react"
import { get } from "firebase/database";
import { render } from "react-dom";
export default function DestinationSelectedScreen(props) {
    const navigate = useNavigate();
    const [destAirports, setDestAirports] = useState([])
    const [departureAirports, setDepartureAirports] = useState([])
    const [departureFlights, setDepartureFlights] = useState([])

    function getDestAirports() {
        const firstDest = props.destArray[0]
        fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${firstDest.latitude},${firstDest.longitude}?lang=en`, {
            headers: {
                'Authorization': `Bearer ${props.lufthansaAccessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const filteredAirports = data.NearestAirportResource.Airports.Airport.filter(airport => airport.Distance.Value < 50);
                setDestAirports(filteredAirports);
                console.log(filteredAirports)
            })
            .catch(error => {
                console.error(error);
                alert(error)
            });
    }
    function getDepartureAirports() {
        fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${props.userLocation.latitude},${props.userLocation.longitude}?lang=en`, {
            headers: {
                'Authorization': `Bearer ${props.lufthansaAccessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const filteredAirports = data.NearestAirportResource.Airports.Airport.filter(airport => airport.Distance.Value < 50);
                setDepartureAirports(filteredAirports);
                console.log(filteredAirports)
            })
            .catch(error => {
                console.error(error);
                alert(error)
            });
    }

    function getFlight() {
        departureAirports.forEach(departureAirport => {
            destAirports.forEach(destAirport => {
                const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departureAirport.AirportCode}&destinationLocationCode=${destAirport.AirportCode}&departureDate=2023-07-01&adults=1&max=1';
                // console.log(departureAirport.AirportCode + departureAirport.Names.Name.$)
                // console.log(destAirport.AirportCode + destAirport.Names.Name.$)
            })
        })
    }

    useEffect(() => {
        props.monitorAuthState()
        if (props.destArray.length !== 0) {
            getDestAirports()
            getDepartureAirports()
            // getFlight()
        }
    }, [navigate, props.destArray])

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