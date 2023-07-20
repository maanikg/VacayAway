import React, { Component } from 'react';
import { useNavigate } from 'react-router';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import MainMap from './Map';
import mapStyle from './mapStyle';

// const mapStyles = {
//   width: '100%',
//   height: '100%',
//   elementType: "geometry", stylers: [{ color: "#6c0f0f" }]
// };
// const containerStyle = {
//   position: 'absolute'
//   width: '50%',
//   height: '50%',

//   backgroundColor: 'black'
// }
// const mapStyle = [
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [
//       { color: '#2e72ad' }
//     ]
//   },
//   {
//     featureType: 'landscape',
//     elementType: 'geometry',
//     stylers: [
//       { color: '#f2f2f2' }
//     ]
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [
//       { color: '#000000' }
//     ]
//   }
// ];
// const zoom = 10;
// const navigate = useNavigate()
// let history = useHistory()

// MapContainer.defaultProps = GoogleMapStyles;
export default function MapContainer(props) {
    const navigate = useNavigate();
    return (
        <div >
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#6c423e' }}>
                <h1  >Hi! </h1>
            </div>
            {/* <div style={{ position: 'relative', width: '100vw', height: '40vh' }} /> */}
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'relative', width: '100vw', height: '80vh' }}>
                    {/* <Map
                            // style={this.mapStyle}
                            style={mapStyle}
                            disableDefaultUI={true}
                            google={this.props.google}
                            zoom={15}
                            initialCenter={coords}
                            // containerStyle={containerStyle}
                            onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}

                        >
                            <Marker position={coords} />
                        </Map> */}
                    <MainMap
                        userLocation={props.userLocation}
                        loaded={props.loaded}
                        setLoaded={props.setLoaded}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '30vw', backgroundColor: '#cd0d0d' }}>
                    <h1>Sidebar</h1>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0d57cd' }}>
                <h1>Footer</h1>
            </div>
            <button onClick={
                () => navigate('/')
            }>Go Home</button>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0dcd9d' }}>
                <h1>Footer2</h1>
            </div>
        </div >
    )
}