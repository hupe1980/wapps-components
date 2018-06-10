import React from 'react';
import { storiesOf } from '@storybook/react';
import withState from '@wapps/storybook-addon-state';

import { Api, Container } from './helper';
import Map from '../Map';
import Marker from '../Marker';
import Circle from '../Circle';
import Rectangle from '../Rectangle';
import InfoWindow from '../InfoWindow';

storiesOf('react-google-maps|InfoWindow', module)
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
          >
            <InfoWindow open>
              <div>Hello World!</div>
            </InfoWindow>
          </Marker>
        </Map>
      </Container>
    </Api>
  ))
  .add('with Circle', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
        >
          <Circle
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#FF0000"
            fillOpacity={0.35}
            center={{
              lat: 52.520008,
              lng: 13.404954,
            }}
            radius={150}
          >
            <InfoWindow open>
              <div>Hello World!</div>
            </InfoWindow>
          </Circle>
        </Map>
      </Container>
    </Api>
  ))
  .add('with Rectangle', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
        >
          <Rectangle
            bounds={{
              north: 52.519008,
              south: 52.518508,
              east: 13.414954,
              west: 13.394954,
            }}
          >
            <InfoWindow open>
              <div>Hello World!</div>
            </InfoWindow>
          </Rectangle>
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
  ))
  .add(
    'with state',
    withState({ open: true })(({ store }) => (
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
              onClick={() => store.set({ open: true })}
            >
              <InfoWindow
                open={store.state.open}
                onCloseclick={() => store.set({ open: false })}
              >
                <div>Close the infowindow an click the marker!</div>
              </InfoWindow>
            </Marker>
          </Map>
        </Container>
      </Api>
    )),
  );
