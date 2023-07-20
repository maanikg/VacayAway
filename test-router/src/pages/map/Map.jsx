import React, { useEffect } from 'react'
import { GoogleMap } from '@react-google-maps/api';
import LoadMap from './LoadMap';
import { useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%'
};

// useEffect(() => {
//     console.log("useEffect")
// }, [])

function MainMap(props) {
    // const loaded = true
    console.log(props.userLocation)
    // const [apiLoaded, setApiLoaded] = useState(false);
    // Object.keys(props.userLocation).length === 0 ? console.log(props.userLocation.latitude, props.userLocation.longitude) : console.log("no user location")
    const center = props.userLocation === {} ? { lat: props.userLocation.latitude, lng: props.userLocation.longitude } : { lat: 43.6532, lng: -79.3832 };
    // window.onload = function () {
    // window.onload = function () {
    //     setApiLoaded(true); // set the flag to true when the API has finished loading
    // }
    // console.log("apiLoaded", apiLoaded)
    return (
        <>
            <LoadMap
                loaded={props.loaded}
                setLoaded={props.setLoaded}
            />
            {props.loaded &&
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={center}
                    zoom={15}
                >
                </GoogleMap>
            }
        </>
    )
    // }
}

export default MainMap