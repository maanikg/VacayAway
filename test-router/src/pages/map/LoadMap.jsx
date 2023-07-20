import React from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const libraryImports = ["places"]
export default function LoadMap(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc',
        libraries: libraryImports
    });
    props.setLoaded(false)
    if (!isLoaded) return <div>loading</div>
    props.setLoaded(true)
    return (
        <></>
    )
}