import React from "react"
import { Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';
import { useEffect } from "react";
import { useState } from "react"
import { ref, push, update } from "firebase/database";
import { auth, db } from "../api/firebase.js"
// import * as torch from 'torch-js';
export default function DestinationSelectedScreen(props) {
    //flights
    const [departureFlights, setDepartureFlights] = useState([])
    const [destFlightLatLon, setDestFlightLatLon] = useState({})
    const [newPathKey, setNewPathKey] = useState()

    //time
    const [startDateTime, setStartDateTime] = useState()
    const [endDateTime, setEndDateTime] = useState()
    const [fullDays, setFullDays] = useState()

    //attractions and lodging
    const [attractions, setAttractions] = useState([])
    const [savedAttractions, setSavedAttractions] = useState([])
    const [averageLatLon, setAverageLatLon] = useState({})
    const [localCenter, setLocalCenter] = useState({ lat: 43.6532, lng: -79.3832 });
    const [lodging, setLodging] = useState()

    //mapping
    const [map, setMap] = useState(null);
    const [attractionMarkers, setAttractionMarkers] = useState([]);
    const [hotelMarkers, setHotelMarkers] = useState();

    //flights and airports
    var localDepAirports = [];
    var localDestAirports = [];
    var localDepFlights = []
    var depAirportPromise
    var destAirportPromise
    var localDestFlightLatLon
    var localDepFlightLatLon
    var localTimeZoneDict = {}
    var localCheapestFlight
    var localReturnFlight
    let localAttractions = []
    var curatedAttractions
    var numFullDays
    var startTripDateTime, endTripDateTime
    let localService
    const [service, setService] = useState()

    useEffect(() => {
        if (props.loaded) {
            localService = new window.google.maps.places.PlacesService(document.createElement('div'));
            setService(localService)
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
        const newPath = push(pathRef)
        setNewPathKey(newPath.key)
        const flightRef = ref(db, 'users/' + auth.currentUser.uid + '/trips/' + newPath.key + '/flight')
        function saveTripDataSub(tripSegment, flights) {
            const segments = flights.data[0].itineraries[0].segments;
            const lastIndex = segments.length - 1;
            if (tripSegment === 'departure') {
                startTripDateTime = segments[lastIndex].arrival.at
                const startTripDateTimeFormatted = convertDateString(startTripDateTime)
                setStartDateTime(startTripDateTimeFormatted)
                console.log(startTripDateTimeFormatted)
            } else if (tripSegment === 'return') {
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
        console.log(numFullDays)
    }

    function searchGoogle() {
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
        }
        service.nearbySearch(request, (results, status, pagination) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                alert(status)
                return
            }

            console.log(results)
            //need to only take operational businesses
            // results.forEach((result) => {
            //     if (result.business_status === "OPERATIONAL") {
            //     }
            // })
            localAttractions = [...localAttractions, ...results]
            setAttractions(localAttractions)
            if (localAttractions.length < 7 * fullDays && pagination.hasNextPage) {
                pagination.nextPage();
            }

        }
        )
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
        const attractionsRef = ref(db, 'users/' + auth.currentUser.uid + '/trips/' + newPathKey + '/attractions');
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
        console.log(JSON.stringify(savedAttractions))
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedAttractions),
        })
            // .then(response => response.json())
            .then(response => console.log(response))
            .then(data => console.log(data))
            .catch((error) => console.log(error))
    }

    function searchHotels() {
        const localAverageLatLon = savedAttractions.reduce(
            (accumulator, attraction) => {
                accumulator.lat += attraction.latitude;
                accumulator.lng += attraction.longitude;
                return accumulator;
            },
            { lat: 0, lng: 0 }
        );

        localAverageLatLon.lat /= savedAttractions.length;
        localAverageLatLon.lng /= savedAttractions.length;

        setAverageLatLon(localAverageLatLon)

        const request = {
            location: localAverageLatLon,
            radius: 5000,
            type: "lodging",
        };
        service.nearbySearch(request, (results, status, pagination) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                alert(status)
                return
            }
            const localLodging = results;
            localLodging.sort((a, b) => b.rating - a.rating)
            const selectedLodging = results.find((result) => result.business_status === "OPERATIONAL");
            const formattedSelectedLodging = {
                name: selectedLodging.name,
                latitude: selectedLodging.geometry.location.lat(),
                longitude: selectedLodging.geometry.location.lng(),
                numRatings: selectedLodging.user_ratings_total,
                rating: selectedLodging.rating,
                reference: selectedLodging.reference,
            };
            setLodging(formattedSelectedLodging)

            const hotelRef = ref(db, 'users/' + auth.currentUser.uid + '/trips/' + newPathKey + '/hotel');
            update(hotelRef, formattedSelectedLodging)
        })

    }

    const generateTrip = () => {
        getDestAirports()
        getDepartureAirports()

        Promise.all([depAirportPromise, destAirportPromise])
            .then(() => {
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
            console.log("cheapest selected")

            if (localCheapestFlight === null) {
                return
            }

            const depAirportCheapest = localCheapestFlight.data[0].itineraries[0].segments[0].departure.iataCode
            const segments = localCheapestFlight.data[0].itineraries[0].segments;
            const destAirportCheapest = localCheapestFlight.data[0].itineraries[0].segments[segments.length - 1].arrival.iataCode

            const airports = Object.keys(localCheapestFlight.dictionaries.locations)

            console.log(airports)
            var depAirportsPromise
            airports.forEach((airport) => {
                depAirportsPromise = fetch(`https://api.lufthansa.com/v1/mds-references/airports/${airport}?lang=EN`, {
                    headers: {
                        'Authorization': `Bearer ${props.lufthansaAccessToken}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const timezone = data.AirportResource.Airports.Airport.UtcOffset;
                        localTimeZoneDict[airport] = timezone
                    })
                    .catch(error => {
                        console.error(`Error fetching timezone for airport ${airport}: ${error}`);
                    });
            });

            for (let i = 0; i < localDepAirports.length; i++) {
                if (localDepAirports[i].AirportCode === depAirportCheapest) {
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
                    if (response.meta.count === 0) {
                        return
                    }
                    localReturnFlight = response

                    const airports = Object.keys(localReturnFlight.dictionaries.locations)
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
                            results.forEach(result => {
                                localTimeZoneDict[result.airport] = result.timezone;
                            });
                            console.log(localTimeZoneDict);
                            console.log("complete")
                            saveTripData()
                        })
                        .catch(error => {
                            console.error(error);
                        });

                })
                .catch(error => {
                    console.log(error.message)
                })

        }
    }

    useEffect(() => {
        props.monitorAuthState()
    }, [props.currentScreen])
    //hello - shruti is here

    const handleMapLoad = (map) => {
        setMap(map);
    };

    //latitude and longitude are different capitalizations in db for flight and attractions
    useEffect(() => {
        if (map === null) return
        if (averageLatLon !== undefined && averageLatLon.lat !== undefined && averageLatLon.lng !== undefined) {
            const center = { lat: averageLatLon.lat, lng: averageLatLon.lng };
            map.panTo(center);
            setLocalCenter(center);
            const bounds = new window.google.maps.LatLngBounds();
            savedAttractions.forEach((attraction) => {
                const tempLatLon = { lat: attraction.latitude, lng: attraction.longitude }
                bounds.extend(tempLatLon);
            });
            map.fitBounds(bounds);
        } else if (destFlightLatLon !== undefined && destFlightLatLon.Latitude !== undefined && destFlightLatLon.Longitude !== undefined) {
            const center = { lat: destFlightLatLon.Latitude, lng: destFlightLatLon.Longitude };
            map.panTo(center);
            setLocalCenter(center);
        }
        if (savedAttractions.length !== 0) {
            const markers = savedAttractions.map((attraction) => {
                const position = { lat: attraction.latitude, lng: attraction.longitude };
                return <Marker
                    key={attraction.Id}
                    position={position}
                    opacity={.6}
                // animation={window.google.maps.Animation.DROP}
                />;
            });
            setAttractionMarkers(markers);
        }
        if (lodging !== undefined) {
            console.log(lodging)
            const hotelMarker = <Marker
                position={{ lat: lodging.latitude, lng: lodging.longitude }}
                opacity={.6}
                animation={window.google.maps.Animation.DROP}
            />
            // map.panTo({ lat: lodging.latitude, lng: lodging.longitude })
            setHotelMarkers(hotelMarker);
        }
    }, [map, destFlightLatLon, savedAttractions, averageLatLon, lodging]);

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
                    <button
                        onClick={searchHotels}
                    >
                        Search Hotels
                    </button>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                    }}
                >
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={localCenter}
                        zoom={13}
                        onLoad={handleMapLoad}
                    >
                        {attractionMarkers}
                        {hotelMarkers}
                    </GoogleMap>
                </div>
            </div>
        </div >
    )
}