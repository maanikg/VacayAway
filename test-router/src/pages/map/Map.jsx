import React from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 43.6532, lng: -79.3832
};

const libraryImports = ["places"]

function MainMap() {
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: 'AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc',
    //     libraries: libraryImports
    // });
    // if (!isLoaded) return <div>Loading...</div>;
    return (

        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={15}
        >
        </GoogleMap>
    )
}

export default MainMap