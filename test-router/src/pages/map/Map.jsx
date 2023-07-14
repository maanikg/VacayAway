import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 43.6532, lng: -79.3832
};

function MainMap() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default MainMap