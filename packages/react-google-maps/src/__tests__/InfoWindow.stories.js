import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Marker from '../Marker';
import InfoWindow from '../InfoWindow';

let marker = null;

class Wrapper extends Component {
  state = {
    marker: null,
  };

  render() {
    return (
      <Api>
        <Container>
          <Map
            center={{
              lat: 52.520008,
              lng: 13.404954,
            }}
            zoom={15}
          >
            <Marker
              position={{
                lat: 52.520008,
                lng: 13.404954,
              }}
              markerRef={marker => this.setState({ marker })}
            />
            {this.state.marker && (
              <InfoWindow open marker={this.state.marker}>
                <div>Hello World!</div>
              </InfoWindow>
            )}
          </Map>
        </Container>
      </Api>
    );
  }
}

storiesOf('InfoWindow', module)
  .add('with Marker', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat: 52.520008,
              lng: 13.404954,
            }}
            markerRef={ref => (marker = ref)}
          />
          <InfoWindow open marker={marker}>
            <div>Hello World!</div>
          </InfoWindow>
        </Map>
      </Container>
    </Api>
  ))
  .add('with Position', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
        >
          <InfoWindow
            open
            position={{
              lat: 52.520008,
              lng: 13.404954,
            }}
          >
            <div>Hello World!</div>
          </InfoWindow>
        </Map>
      </Container>
    </Api>
  ));
