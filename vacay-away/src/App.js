import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  // { elementType: "geometry", stylers: [{ color: "#242f3e" }] } 
};

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <h1>Hi</h1>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={
            {
              lat: -1.2884,
              lng: 36.8233
            }
          }
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc'
})(MapContainer);