import React from 'react'
import { GoogleMap} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 43.6532, lng: -79.3832
};

function MainMap() {
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