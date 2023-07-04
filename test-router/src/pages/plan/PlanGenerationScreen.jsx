import { /*Outlet, Link, NavLink,*/ useNavigate } from "react-router-dom";
import React from "react"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react"
import { get, set } from "firebase/database";
import { render } from "react-dom";
import { amadeusConfig } from "../amadeusAPI"
import { lufthansaConfig } from "../lufthansaAPI";
export default function DestinationSelectedScreen(props) {
    const navigate = useNavigate();
    const [destAirports, setDestAirports] = useState([])
    const [departureAirports, setDepartureAirports] = useState([])
    const [departureFlights, setDepartureFlights] = useState([])
    const [cheapestFlight, setCheapestFlight] = useState({})

    const generateTrip = () => {
        // setupLufthansaAPI()
        // setupAmadeusAPI()
        getDestAirports()
        getDepartureAirports()
        getFlight()
        console.log(cheapestFlight)
        // getFlightTest()
    }

    function getDestAirports() {
        // console.log('destAirports')
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
                // console.log(filteredAirports)
            })
            .catch(error => {
                // console.error(error);
                alert(error)
            });
    }
    function getDepartureAirports() {
        // console.log('departureAirports')
        fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${props.userLocation.latitude},${props.userLocation.longitude}?lang=en`, {
            headers: {
                'Authorization': `Bearer ${props.lufthansaAccessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const filteredAirports = data.NearestAirportResource.Airports.Airport.filter(airport => airport.Distance.Value < 50);
                setDepartureAirports(filteredAirports);
                // console.log(filteredAirports)
            })
            .catch(error => {
                // console.error(error);
                alert(error)
            });
    }

    function getFlightTest() {
        const departureDate = new Date(props.departureDate);
        const year = departureDate.getFullYear();
        const month = departureDate.getMonth() + 1; // add 1 to get month in range 1-12
        const day = departureDate.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=LHR&destinationLocationCode=YYZ&departureDate=${formattedDate}&adults=1&nonStop=false&currencyCode=CAD&max=1`, {
            headers: {
                'Authorization': `Bearer ${props.amadeusAccessToken}`
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(response.meta)
                console.log(response.meta.count)
            })
            .catch(error => {
                if (error.message !== "TypeError: undefined is not an object (evaluating 'data.meta.count')") {
                    console.error(error.message);
                    alert(error)
                }
            });
    }
    function getFlight() {
        const departureDate = new Date(props.departureDate);
        const year = departureDate.getFullYear();
        const month = departureDate.getMonth() + 1; // add 1 to get month in range 1-12
        const day = departureDate.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        // console.log('getFlight')
        departureAirports.forEach(departureAirport => {
            destAirports.forEach((destAirport, index) => {
                setTimeout(() => {
                    console.log(destAirport.AirportCode + " " + departureAirport.AirportCode)
                    fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departureAirport.AirportCode}&destinationLocationCode=${destAirport.AirportCode}&departureDate=${formattedDate}&adults=1&nonStop=false&currencyCode=CAD&max=1`, {
                        headers: {
                            'Authorization': `Bearer ${props.amadeusAccessToken}`
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            // console.log(departureAirport.AirportCode + " " + destAirport.AirportCode + " ")
                            // console.log(response)
                            if (response.meta.count != 0) {
                                // console.log(response)
                                setDepartureFlights([...departureFlights, response.data[0]])
                            }
                        })
                        .catch(error => {
                            if (error.message !== "TypeError: undefined is not an object (evaluating 'data.meta.count')") {
                                console.error(error.message);
                                // alert(error)
                            } else {
                                console.log(error.message)
                            }
                        });
                }, 1000 * index)
            })
        })
        // console.log("!!")
        // console.log(departureFlights)
        const cheapestFlightTemp = departureFlights.reduce((prevFlight, currFlight) => {
            if (prevFlight === null || currFlight.price.total < prevFlight.price.total) {
                return currFlight;
            } else {
                return prevFlight;
            }
        }, null);
        setCheapestFlight(cheapestFlightTemp)
    }

    useEffect(() => {
        props.monitorAuthState()
        if (props.destArray.length !== 0) {
            // getDestAirports()
            // getDepartureAirports()
            // getFlight()
        }
    }, [props.currentScreen])

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
                    {/* <p>{ props.departureDate.toString()}</p> */}
                    <p>{props.returnDate.toString()}</p>
                </div>
                <div
                    style={{ display: "flex" }}
                >
                    <p>When do you want to come back?</p>
                    <button
                        onClick={generateTrip}>
                        Hi
                    </button>
                </div>
            </div>
        </div >
    )
}