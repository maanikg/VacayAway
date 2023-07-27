
import React from "react"
import MainMap from "../map/Map.jsx";
import LoadMap from "../map/LoadMap.jsx";
import { Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';
import { useEffect } from "react";
import { useState } from "react"
import { ref, push, update, /*set*/ } from "firebase/database";
import { auth, db } from "../api/firebase.js"
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
    const [newPathglobal, setNewPathGlobal] = useState()
    const [startDateTime, setStartDateTime] = useState()
    const [endDateTime, setEndDateTime] = useState()
    const [destTimezone, setDestTimezone] = useState()
    const [fullDays, setFullDays] = useState()
    const [attractionsMarkers, setAttractionsMarkers] = useState([]);
    var localDepAirports = [];
    const [map, setMap] = useState(null);
    const [localCenter, setLocalCenter] = useState({ lat: 43.6532, lng: -79.3832 });
    var localDestAirports = [];
    var localDepFlights = []
    var depAirportPromise
    var airportPromise
    var airportPromise2
    var destAirportPromise
    var localDestFlightLatLon
    var localDepFlightLatLon
    var localTimeZoneDict = {}
    let localLodging = []
    var localCheapestFlight
    var localReturnFlight
    let localAttractions = []
    let newPath
    var curatedAttractions
    var localDestTimezone
    var numFullDays
    var startTripDateTime, endTripDateTime
    var newTrip
    const [savedAttractions, setSavedAttractions] = useState([])
    let service

    useEffect(() => {
        console.log(props.loaded)
        if (props.loaded) {
            service = new window.google.maps.places.PlacesService(document.createElement('div'));
        }
    }, [props.loaded])

    function convertDateString(dateString) {
        const dateComponents = dateString.split('T');
        const date = dateComponents[0];
        const time = dateComponents[1];
        const year = date.substring(0, 4);
        const month = date.substring(5, 7) - 1; // Subtract 1 because months are zero-indexed in JavaScript
        const day = date.substring(8, 10);
        const hour = time.substring(0, 2);
        const minute = time.substring(3, 5);
        const second = time.substring(6, 8);
        return new Date(year, month, day, hour, minute, second);
    }

    function saveTripData() {
        const pathRef = ref(db, 'users/' + auth.currentUser.uid + '/trips')
        newPath = push(pathRef)
        setNewPathGlobal(newPath.key)
        newTrip = newPath.key
        const flightRef = ref(db, 'users/' + auth.currentUser.uid + '/trips/' + newPath.key + '/flight')
        function saveTripDataSub(tripSegment, flights) {
            const segments = flights.data[0].itineraries[0].segments;
            const lastIndex = segments.length - 1;
            if (tripSegment === 'departure') {
                console.log("dep")
                startTripDateTime = segments[lastIndex].arrival.at
                const startTripDateTimeFormatted = convertDateString(startTripDateTime)
                setStartDateTime(startTripDateTimeFormatted)
                console.log(startTripDateTimeFormatted)
            } else if (tripSegment === 'return') {
                console.log("ret")
                endTripDateTime = segments[0].departure.at
                const endTripDateTimeFormatted = convertDateString(endTripDateTime)
                setEndDateTime(endTripDateTimeFormatted)
                console.log(endTripDateTimeFormatted)
            }
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
                    update(flightRef, {
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
        update(flightRef, {
            totalDepartureLatLon: localDepFlightLatLon,
            totalArrivalLatLon: localDestFlightLatLon,
            departureAirport: localCheapestFlight.data[0].itineraries[0].segments[0].departure.iataCode,
            arrivalAirport: localReturnFlight.data[0].itineraries[0].segments[0].departure.iataCode,
            timezones: localTimeZoneDict
        })
        saveTripDataSub('departure', localCheapestFlight)
        saveTripDataSub('return', localReturnFlight)
    }

    function temp() {
        console.log(startDateTime)
        console.log(endDateTime)
        const innerStart = new Date(startDateTime)
        innerStart.setDate(innerStart.getDate() + 1)
        innerStart.setHours(0, 0, 0, 0)

        const innerEnd = new Date(endDateTime)
        innerEnd.setDate(innerEnd.getDate())
        innerEnd.setHours(0, 0, 0, 0)
        console.log(innerStart)
        console.log(innerEnd)

        // const duration = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60 * 24)
        numFullDays = (innerEnd.getTime() - innerStart.getTime()) / (1000 * 60 * 60 * 24)
        setFullDays(numFullDays)
        // console.log(duration)
        console.log(numFullDays)
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
                setAttractions(localAttractions)
                console.log(pagination)
                // console.log(numFullDays)
                // console.log(fullDays)
                if (localAttractions.length < 7 * fullDays && pagination.hasNextPage) {
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
        attractions.sort((a, b) => b.rating - a.rating)
        console.log(attractions)
        curatedAttractions = attractions.map((attraction) => ({
            name: attraction.name,
            latitude: attraction.geometry.location.lat(),
            longitude: attraction.geometry.location.lng(),
            numRatings: attraction.user_ratings_total,
            rating: attraction.rating,
            reference: attraction.reference,
            // opening_hours: attraction.opening_hours,
        }));
        const promises = [];

        for (let i = 0; i < 7 * fullDays; i++) {
            const promise = new Promise((resolve, reject) => {
                service.getDetails(
                    {
                        placeId: curatedAttractions[i].reference,
                        fields: ["opening_hours"],
                    },
                    (result, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                            if (result.opening_hours) {
                                curatedAttractions[i].opening_hours = result.opening_hours;
                            }
                            resolve();
                        } else {
                            reject(`Error fetching details for place ${curatedAttractions[i].reference}: ${status}`);
                        }
                    }
                );
            });
            promises.push(promise);
        }

        Promise.all(promises)
            .then(() => {
                curatedAttractions = curatedAttractions.slice(0, 7 * fullDays)
                console.log(curatedAttractions);
                setSavedAttractions(curatedAttractions.slice(0, 7 * fullDays))
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function outputResults() {
        const attractionsRef = ref(db, 'users/' + auth.currentUser.uid + '/trips/' + newPathglobal + '/attractions');
        // update(attractionsRef, {
        //     temp: savedAttractions[1].name
        //     // savedAttractions)
        // })
        console.log(savedAttractions)
        console.log(savedAttractions.length)
        savedAttractions.forEach((attraction, index) => {
            update(attractionsRef, {
                [index]: {
                    name: attraction.name,
                    latitude: attraction.latitude,
                    longitude: attraction.longitude,
                    numRatings: attraction.numRatings,
                    rating: attraction.rating,
                    reference: attraction.reference,
                    opening_hours: attraction.opening_hours ? attraction.opening_hours.periods : null,
                }
            })
        })
        console.log(savedAttractions)
    }
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
                setDestTimezone(localDestAirports);
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
                            if (response.meta.count !== 0) {
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
            console.log(localCheapestFlight)
            console.log("cheapest selected")

            if (localCheapestFlight !== null) {
                const depAirportCheapest = localCheapestFlight.data[0].itineraries[0].segments[0].departure.iataCode
                const segments = localCheapestFlight.data[0].itineraries[0].segments;
                const destAirportCheapest = localCheapestFlight.data[0].itineraries[0].segments[segments.length - 1].arrival.iataCode

                const airports = Object.keys(localCheapestFlight.dictionaries.locations)
                const timezoneDict = {};
                console.log(airports)

                airports.forEach((airport) => {
                    airportPromise = fetch(`https://api.lufthansa.com/v1/mds-references/airports/${airport}?lang=EN`, {
                        headers: {
                            'Authorization': `Bearer ${props.lufthansaAccessToken}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            const timezone = data.AirportResource.Airports.Airport.UtcOffset;
                            timezoneDict[airport] = timezone
                            localTimeZoneDict[airport] = timezone
                        })
                        .catch(error => {
                            console.error(`Error fetching timezone for airport ${airport}: ${error}`);
                        });
                });
                Promise.all([airportPromise])
                    .then(() => {
                        console.log("timezoneDict")
                        console.log(timezoneDict);
                        console.log(localTimeZoneDict);
                    })


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
                        // localCenter = localDestFlightLatLon
                        // console.log(localDestFlightLatLon)
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
                        if (response.meta.count !== 0) {
                            localReturnFlight = response
                            setReturnFlight(response)

                            const airports = Object.keys(localReturnFlight.dictionaries.locations)
                            const timezoneDict = {};
                            const timezonePromises = [];
                            console.log(airports)

                            airports.forEach((airport) => {
                                const promise = new Promise((resolve, reject) => {
                                    fetch(`https://api.lufthansa.com/v1/mds-references/airports/${airport}?lang=EN`, {
                                        headers: {
                                            'Authorization': `Bearer ${props.lufthansaAccessToken}`
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            const timezone = data.AirportResource.Airports.Airport.UtcOffset;
                                            resolve({ airport, timezone });
                                        })
                                        .catch(error => {
                                            reject(`Error fetching timezone for airport ${airport}: ${error}`);
                                        });
                                });
                                timezonePromises.push(promise);
                            });

                            Promise.all(timezonePromises)
                                .then(results => {
                                    // const timezoneDict = {};
                                    results.forEach(result => {
                                        localTimeZoneDict[result.airport] = result.timezone;
                                    });
                                    console.log(localTimeZoneDict);
                                    alert("complete")
                                    saveTripData()
                                })
                                .catch(error => {
                                    console.error(error);
                                });
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

    // console.log(localCheapestFlight)
    // const center = (props.userLocation !== null && props.userLocation !== {} && props.userLocation.latitude !== undefined && props.userLocation.longitude !== undefined) ? { lat: props.userLocation.latitude, lng: props.userLocation.longitude } : { lat: 43.6532, lng: -79.3832 };
    // const center = (localCheapestFlight !== undefined) ? { lat: localDestFlightLatLon.Latitude, lng: localDestFlightLatLon.Longitude } : { lat: 43.6532, lng: -79.3832 };



    const handleMapLoad = (map) => {
        setMap(map);
    };

    useEffect(() => {
        console.log(destFlightLatLon)
        if (map !== null && destFlightLatLon !== undefined && destFlightLatLon.Latitude !== undefined && destFlightLatLon.Longitude !== undefined) {
            const center = { lat: destFlightLatLon.Latitude, lng: destFlightLatLon.Longitude };
            map.panTo(center);
            setLocalCenter(center);
        }
        if (map !== null && savedAttractions.length !== 0) {
            const markers = savedAttractions.map((attraction) => {
                const position = { lat: attraction.Latitude, lng: attraction.Longitude };
                return <Marker key={attraction.Id} position={position} />;
            });
            setAttractionsMarkers(markers);
        }
    }, [map, destFlightLatLon, savedAttractions]);

    // useEffect(() => {
    //     console.log(localDestFlightLatLon)
    //     if (localDestFlightLatLon !== undefined) {
    //         const center = { lat: localDestFlightLatLon.Latitude, lng: localDestFlightLatLon.Longitude };
    //         // setCenter(center);
    //     }
    // }, []);

    // const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
    // console.log(localCenter)
    // console.log(destFlightLatLon.Latitude)
    // console.log(destFlightLatLon.Longitude)
    if (!props.loaded) {
        return null;
    }
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
                {/* <MainMap
                    userLocation={props.userLocation}
                    loaded={props.loaded}
                    setLoaded={props.setLoaded}
                /> */}
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
                        onClick={temp}>
                        Temps
                    </button>
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
                <div
                    style={{ width: "100%", height: "100vh" }}
                >
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={localCenter}
                        zoom={13}
                        onLoad={handleMapLoad}
                    >
                        {attractionsMarkers}
                    </GoogleMap>
                </div>
            </div>
        </div >
    )
}