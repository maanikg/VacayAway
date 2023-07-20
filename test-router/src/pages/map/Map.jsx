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
    // console.log(props.userLocation)
    // console.log(props.userLocation.latitude)
    // console.log(props.userLocation.longitude)
    const center = (props.userLocation !== null && props.userLocation !== {} && props.userLocation.latitude !== undefined && props.userLocation.longitude !== undefined) ? { lat: props.userLocation.latitude, lng: props.userLocation.longitude } : { lat: 43.6532, lng: -79.3832 };
    // console.log(center)

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
}

export default MainMap