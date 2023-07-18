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
    const [lodging, setLodging] = useState([])
    const [attractions, setAttractions] = useState([])
    var localDepAirports = [];
    var localDestAirports = [];
    var localDepFlights = []
    var depAirportPromise
    var destAirportPromise
    var localDestFlightLatLon
    var localDepFlightLatLon
    let localLodging = []
    var localCheapestFlight
    var localReturnFlight
    let localAttractions = []
    const [savedAttractions, setSavedAttractions] = useState([])
    let service = new window.google.maps.places.PlacesService(document.createElement('div'));

    function saveTripData() {
        const pathRef = ref(db, 'users/' + auth.currentUser.uid + '/trips')
        const newPath = push(pathRef)
        function saveTripDataSub(tripSegment, flights) {
            const segments = flights.data[0].itineraries[0].segments;
            const lastIndex = segments.length - 1;
            const segmentData = [];
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
                        }
                    });
                }
            });
        }
        update(newPath, {
            // totalDepartureLatLon: depFlightLatLon,
            totalDepartureLatLon: localDepFlightLatLon,
            // totalArrivalLatLon: destFlightLatLon,
            totalArrivalLatLon: localDestFlightLatLon,
            departureAirport: localCheapestFlight.data[0].itineraries[0].segments[0].departure.iataCode,
            arrivalAirport: localReturnFlight.data[0].itineraries[0].segments[0].departure.iataCode
        })
        saveTripDataSub('departure', localCheapestFlight)
        saveTripDataSub('return', localReturnFlight)
    }

    function searchGoogle() {
        // alert("hi")
        const request = {
            location: {
                lat: destFlightLatLon.Latitude,
                lng: destFlightLatLon.Longitude
            },
            radius: 50000,
            // type: ['lodging'],
            // type: ['tourist_attraction'],
            // type: ['landmark'],
            keyword: ['tourist attraction'],
            // keyword: ['hotel'],
            // type: ['point_of_interest', '-lodging'],
            language: 'en',
            // pagetoken: "Aaw_FcI7OIADLDSc0BkwavxNQ9jIikYOm7IrtE7oEIEnW3Hs65vWHQlsuvv2ohoqOUvMTZRZQ6j6RLXhpcWOOS1rdaDszP3s3Q4pyHK_Acl8eDUbruE7oTsuvNItH5rQ79INXA9u0P0d"
            // Aaw_FcL3oDO1j5O4OFiEHOZRzTvEpOjXh9lFjE73Zg_cEgO8aHkBOhCnRSIow_6sOaGtQmuVleoDfBe_T0TQH69cxiQs1JM91ot4AY6kQlCf0oCfpedVkVrp83GaAMlaizFnsAgB1ImR
        }
        service.nearbySearch(request, (results, status, pagination) => {
            // service.nearbySearch(request, (results, status) => {
            console.log(status)
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results)
                results.forEach((result) => {
                    if (result.business_status === "OPERATIONAL") {
                        console.log(result.name)
                        // console.log(result.types)
                        // if (result.opening_hours !== undefined) {
                        //     service.getDetails({
                        //         placeId: result.place_id,
                        //         fields: ["opening_hours", "url", "website", "geometry", "formatted_address", "address_components", "name"]
                        //     }, (results, status) => {
                        //         console.log(results)
                        //         console.log(results.geometry.location.lat())
                        //         console.log(results.geometry.location.lng())
                        //     })
                        //     // console.log(result.opening_hours.isOpen())
                        // }
                    }
                })
                // setLodging(...lodging, results)
                // localLodging = [...localLodging, ...results]
                localAttractions = [...localAttractions, ...results]
                console.log(pagination)
                if (pagination.hasNextPage) {
                    pagination.nextPage();
                }
            }
        }
        )
        // service.getDetails({
        //     // placeId: "ChIJY-ndrTzAQUcR2BkUyAT8F-s",
        //     // placeId: "ChIJTz4qiCM_dkgRJWQuA2Dr-gA",
        //     placeId: "ChIJ_dGXYaUOdkgRjQQ6Whq-jBM",
        //     // fields: ["opening_hours"]
        // }, (results, status) => {
        //     console.log(results)
        // }
        // )
    }

    function searchResults() {
        localAttractions.sort((a, b) => b.rating - a.rating)
        console.log(localAttractions)
        const curatedAttractions = localAttractions.map((attraction) => ({
            name: attraction.name,
            latitude: attraction.geometry.location.lat(),
            longitude: attraction.geometry.location.lng(),
            numRatings: attraction.user_ratings_total,
            rating: attraction.rating,
            reference: attraction.reference,
            // opening_hours: attraction.opening_hours,
        }));
        console.log(curatedAttractions);

        for (let i = 0; i < 10; i++) {
            const place = curatedAttractions[i];
            service.getDetails(
                {
                    placeId: place.reference,
                    fields: ["opening_hours"],
                },
                (result, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        if (result.opening_hours) {
                            place.opening_hours = result.opening_hours;
                        }
                    }
                }
            );
        }
        setSavedAttractions(curatedAttractions.slice(0, 10))
        console.log(savedAttractions)
    }

    function outputResults() {
        console.log(savedAttractions)
    }
    // useEffect(() => {
    //     console.log(lodging)
    // }, [lodging])
    const generateTrip = () => {
        getDestAirports()
        getDepartureAirports()

        Promise.all([depAirportPromise, destAirportPromise])
            .then(() => {
                console.log("calling getFlight")
                getFlight(localDepAirports, localDestAirports)
            })
            .catch(err => console.log(err))
    }
    function getDestAirports() {
        const firstDest = props.destArray[0]
        destAirportPromise = fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${firstDest.latitude},${firstDest.longitude}?lang=en`, {
            headers: {
                'Authorization': `Bearer ${props.lufthansaAccessToken}`
            }
        })
            .then(
                response => response.json()
            )
            .then(data => {
                localDestAirports = data.NearestAirportResource.Airports.Airport.filter(airport => airport.Distance.Value < 50);
                setDestAirports(localDestAirports);
            })
            .catch(error => {
                alert(error)
            });
    }
    function getDepartureAirports() {
        depAirportPromise = fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${props.userLocation.latitude},${props.userLocation.longitude}?lang=en`, {
            headers: {
                'Authorization': `Bearer ${props.lufthansaAccessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                localDepAirports = data.NearestAirportResource.Airports.Airport.filter(airport => airport.Distance.Value < 50);
                setDepartureAirports(localDepAirports);
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

        var numPromises = localDepAirports.length * localDestAirports.length
        localDepAirports.forEach(departureAirport => {
            localDestAirports.forEach((destAirport, index) => {
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
                                // console.log(departureAirport.AirportCode + " " + destAirport.AirportCode + " ")
                                localDepFlights = [...localDepFlights, response]
                                setDepartureFlights([...departureFlights, response])
                            }
                        })
                        .catch(error => {
                            console.log(error.message)
                        })
                        .finally(() => {
                            numPromises--
                            console.log(numPromises)
                            if (numPromises === 0) {
                                console.log("all promises complete")
                                getCheapestFlight()
                            }
                        })
                }, 1000 * index)
            })
        })

        function getCheapestFlight() {
            localCheapestFlight = localDepFlights.reduce((prevFlight, currFlight) => {
                if (prevFlight === null || currFlight.data[0].price.total < prevFlight.data[0].price.total) {
                    return currFlight;
                } else {
                    return prevFlight;
                }
            }, null);
            setCheapestFlight(localCheapestFlight)
            console.log("cheapest selected")
            if (localCheapestFlight !== null) {
                const depAirportCheapest = localCheapestFlight.data[0].itineraries[0].segments[0].departure.iataCode
                const segments = localCheapestFlight.data[0].itineraries[0].segments;
                const destAirportCheapest = localCheapestFlight.data[0].itineraries[0].segments[segments.length - 1].arrival.iataCode
                for (let i = 0; i < localDepAirports.length; i++) {
                    if (localDepAirports[i].AirportCode === depAirportCheapest) {
                        setDepFlightLatLon(localDepAirports[i].Position.Coordinate)
                        localDepFlightLatLon = localDepAirports[i].Position.Coordinate
                        break
                    }
                }
                for (let i = 0; i < localDestAirports.length; i++) {
                    if (localDestAirports[i].AirportCode === destAirportCheapest) {
                        setDestFlightLatLon(localDestAirports[i].Position.Coordinate)
                        localDestFlightLatLon = localDestAirports[i].Position.Coordinate
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
                        if (response.meta.count != 0) {
                            localReturnFlight = response
                            setReturnFlight(response)
                            alert("complete")
                            saveTripData()
                        }
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            }
        }
    }

    useEffect(() => {
        props.monitorAuthState()
    }, [props.currentScreen])
    //hello - shruti is here
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
                        Generate Trip
                    </button>
                    {/* <button
                        onClick={saveTripData}>
                        Save Info
                    </button> */}
                    <button
                        onClick={searchGoogle}>
                        Search Google
                    </button>
                    <button
                        onClick={searchResults}
                    >
                        Search Results
                    </button>
                    <button
                        onClick={outputResults}
                    >
                        Output Results
                    </button>
                </div>
            </div>
        </div >
    )
}