// import { useMemo } from "react";
import { GoogleMap, useLoadScript,/* Marker*/ } from "@react-google-maps/api";

export default function MainMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc",
    });

    if (!isLoaded) return console.log("loading");
    if (loadError) return console.log("error loading");
    // console.log("loaded")
    return (
        <Map />
    )
}

function Map() {

    // const center = useMemo(() => ({ lat: 43.6532, lng: -79.3832 }), []);
    return (
        <GoogleMap
            zoom={15}
            center={{ lat: 43.6532, lng: -79.3832 }}
            mapContainerStyle={{ width: "100%", height: "100%" }}
        />
    );
}