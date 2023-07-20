import React from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const libraryImports = ["places"]
export default function LoadMap(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: libraryImports
    });
    props.setLoaded(false)
    if (!isLoaded) return <div>loading</div>
    props.setLoaded(true)
    return (
        <></>
    )
}