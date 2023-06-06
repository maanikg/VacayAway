import React, { Component } from 'react';
// import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import mapStyle from './GoogleMapStyles';

// const mapStyles = {
// width: '100%',
// height: '100%',
//   elementType: "geometry", stylers: [{ color: "#6c0f0f" }]
// };
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
const zoom = 12;

export class MapContainer extends Component {
  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle
    });
  }

  render() {
    const coords = { lat: -21.805149, lng: -49.0921657 };
    return (
      <Map
        // style={this.mapStyle}
        style={mapStyle}
        google={this.props.google}
        zoom={7}
        initialCenter={coords}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
      >
        <Marker position={coords} />
      </Map>
    );
  }
}

// MapContainer.defaultProps = GoogleMapStyles;

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc'
})(MapContainer);