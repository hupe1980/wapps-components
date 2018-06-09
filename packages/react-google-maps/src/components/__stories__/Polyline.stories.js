import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Polyline from '../Polyline';

/** This example creates a 2-pixel-wide red polyline showing
the path of William Kingsford Smith's first trans-Pacific
flight between Oakland, CA, and Brisbane, Australia. **/

const flightPlanCoordinates = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];

storiesOf('react-google-maps|Polyline', module).add('default', () => (
  <Api>
    <Container>
      <Map center={{ lat: 0, lng: -180 }} zoom={3} mapTypeId="terrain">
        <Polyline
          path={flightPlanCoordinates}
          geodesic
          strokeColor="#FF0000"
          strokeOpacity={1.0}
          strokeWeight={2}
        />
      </Map>
    </Container>
  </Api>
));
