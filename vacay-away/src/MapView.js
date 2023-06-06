import React from "react";

export default function MapView() {
    let map;

    async function initMap() {
        const { Map } = await google.maps.importLibrary("maps");
        map = new Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    }

    initMap();
    return (
        <div>
            <h1>Map View</h1>
        </div>
    )
}