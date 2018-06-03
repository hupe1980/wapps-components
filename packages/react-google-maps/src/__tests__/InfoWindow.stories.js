import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Marker from '../Marker';
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
