import React, { Component } from 'react';
// import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
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

export class MapContainer extends Component {
  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle//,
      // containerStyle: containerStyle
    });
  }

  render() {
    const coords = { lat: 43.6532, lng: -79.3832 };
    return (
      <div >
        <h1>Hi</h1>
        {/* <div style={{ position: 'relative', width: '100vw', height: '40vh' }} /> */}
        <div style={{ position: 'relative', width: '100vw', height: '80vh' }}>
          <Map
            // style={this.mapStyle}
            style={mapStyle}
            google={this.props.google}
            zoom={15}
            initialCenter={coords}
            // containerStyle={containerStyle}
            onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}

          >
            <Marker position={coords} />
          </Map>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h1>Bye</h1>
        </div>
      </div >
    );

  }
}

// MapContainer.defaultProps = GoogleMapStyles;

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc'
})(MapContainer);