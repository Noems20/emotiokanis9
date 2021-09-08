import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Container } from './map.styles';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    mapCenter: {
      lat: 22.768808018625275,
      lng: -102.55538101258693,
    },
    selectedPlace: {
      name: 'Copiass Noé',
    },
  };

  render() {
    const mapStyles = {
      position: 'relative',
      width: '40%',
      height: '40%',
    };
    return (
      <Container>
        <Map
          google={this.props.google}
          zoom={17}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          style={mapStyles}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'Current location'}
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
          />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYjPQz1UMG - MFJU15jqKvHgJOsoFBfVXU',
})(MapContainer);
