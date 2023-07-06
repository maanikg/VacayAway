import React from "react"
import { useEffect } from "react";
import { useState } from "react"
import { ref, push, update } from "firebase/database";
import { auth, db } from "../firebase.js"
export default function DestinationSelectedScreen(props) {
    const [destAirports, setDestAirports] = useState([])
    const [departureAirports, setDepartureAirports] = useState([])
    const [departureFlights, setDepartureFlights] = useState([])
    const [cheapestFlight, setCheapestFlight] = useState({})
    const [returnFlight, setReturnFlight] = useState({})
    const [depFlightLatLon, setDepFlightLatLon] = useState({})
    const [destFlightLatLon, setDestFlightLatLon] = useState({})

    function saveTripData() {
        const pathRef = ref(db, 'users/' + auth.currentUser.uid + '/trips')
        const newPath = push(pathRef)
        function saveTripDataSub(tripSegment, flights) {
            const segments = flights.data[0].itineraries[0].segments;
            const lastIndex = segments.length - 1;
            const segmentData = [];
            console.log(segments)
            segments.forEach((segment, index) => {
                segmentData.push({
                    departure: segment.departure.iataCode,
                    departureTerminal: segment.departure.terminal ? segment.departure.terminal : null,
                    departureDateTime: segment.departure.at,
                    destination: segment.arrival.iataCode,
                    destinationTerminal: segment.arrival.terminal ? segment.arrival.terminal : null,
                    destinationDateTime: segment.arrival.at,
                    duration: segment.duration,
                    flightNumber: segment.carrierCode + segment.number,
                    airline: flights.dictionaries.carriers[segment.carrierCode],
                    aircraft: flights.dictionaries.aircraft[segment.aircraft.code],
                });
                if (index === lastIndex) {
                    update(newPath, {
                        [tripSegment]: {
                            segments: segmentData,
                            price: flights.data[0].price.grandTotal,
                            duration: flights.data[0].itineraries[0].duration,
                            currencyShortForm: flights.data[0].price.currency,
                            currencyLongForm: flights.dictionaries.currencies[flights.data[0].price.currency],
                            // totalDepartureLatLon: cheapestFlightLatLon,
                            // totalArrivalLatLon: arrivalFlightLatLon
                        }
                    });
                }
            });
        }
        console.log(destFlightLatLon)
        update(newPath, {
            totalDepartureLatLon: depFlightLatLon,
            totalArrivalLatLon: destFlightLatLon
        })
        saveTripDataSub('departure', cheapestFlight)
        saveTripDataSub('arrival', returnFlight)
    }

    const generateTrip = () => {
        getDestAirports()
        getDepartureAirports()
        getFlight()
    }

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
            })
            .catch(error => {
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
            })
            .catch(error => {
                alert(error)
            });
    }
    function getFlight() {
        const departureDate = new Date(props.departureDate);
        const depYear = departureDate.getFullYear();
        const depMonth = departureDate.getMonth() + 1;
        const depDay = departureDate.getDate();
        const formattedDepDate = `${depYear}-${depMonth.toString().padStart(2, '0')}-${depDay.toString().padStart(2, '0')}`;

        const returnDate = new Date(props.returnDate);
        const returnYear = returnDate.getFullYear();
        const returnMonth = returnDate.getMonth() + 1;
        const returnDay = returnDate.getDate();
        const formattedReturnDate = `${returnYear}-${returnMonth.toString().padStart(2, '0')}-${returnDay.toString().padStart(2, '0')}`;

        departureAirports.forEach(departureAirport => {
            destAirports.forEach((destAirport, index) => {
                setTimeout(() => {
                    console.log(destAirport.AirportCode + " " + departureAirport.AirportCode)
                    fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departureAirport.AirportCode}&destinationLocationCode=${destAirport.AirportCode}&departureDate=${formattedDepDate}&adults=1&nonStop=false&currencyCode=CAD&max=1`, {
                        headers: {
                            'Authorization': `Bearer ${props.amadeusAccessToken}`
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            if (response.meta.count != 0) {
                                console.log(departureAirport.AirportCode + " " + destAirport.AirportCode + " ")
                                console.log(response)
                                setDepartureFlights([...departureFlights, response])
                            }
                        })
                        .catch(error => {
                            console.log(error.message)
                        });
                }, 1000 * index)
            })
        })
        //need to await maybe?
        const cheapestFlightTemp = departureFlights.reduce((prevFlight, currFlight) => {
            if (prevFlight === null || currFlight.data[0].price.total < prevFlight.data[0].price.total) {
                return currFlight;
            } else {
                return prevFlight;
            }
        }, null);
        console.log(cheapestFlightTemp)
        setCheapestFlight(cheapestFlightTemp)
        if (cheapestFlightTemp !== null) {
            const depAirportCheapest = cheapestFlightTemp.data[0].itineraries[0].segments[0].departure.iataCode
            const segments = cheapestFlightTemp.data[0].itineraries[0].segments;
            const destAirportCheapest = cheapestFlightTemp.data[0].itineraries[0].segments[segments.length - 1].arrival.iataCode
            for (let i = 0; i < departureAirports.length; i++) {
                if (departureAirports[i].AirportCode === depAirportCheapest) {
                    setDepFlightLatLon(departureAirports[i].Position.Coordinate)
                    break
                }
            }
            for (let i = 0; i < destAirports.length; i++) {
                if (destAirports[i].AirportCode === destAirportCheapest) {
                    setDestFlightLatLon(destAirports[i].Position.Coordinate)
                    break
                }
            }
            fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${destAirportCheapest}&destinationLocationCode=${depAirportCheapest}&departureDate=${formattedReturnDate}&adults=1&nonStop=false&currencyCode=CAD&max=1`, {
                headers: {
                    'Authorization': `Bearer ${props.amadeusAccessToken}`
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log(depAirportCheapest + " " + destAirportCheapest + " ")
                    if (response.meta.count != 0) {
                        setReturnFlight(response)
                        console.log(response)
                    }
                })
                .catch(error => {
                    if (error.message !== "TypeError: undefined is not an object (evaluating 'data.meta.count')") {
                        console.error(error.message);
                    } else {
                        console.log(error.message)
                    }
                })
        }
    }

    useEffect(() => {
        if (cheapestFlight !== null && cheapestFlight !== {} && cheapestFlight !== undefined && cheapestFlight !== "") {
            console.log(cheapestFlight)
        }
        props.monitorAuthState()
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
                    <button
                        onClick={saveTripData}>
                        Confirm
                    </button>
                </div>
            </div>
        </div >
    )
}