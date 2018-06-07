import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Polygon from '../Polygon';

// Define the LatLng coordinates for the polygon's path.
const triangleCoords = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 },
];

storiesOf('react-google-maps|Polygon', module).add('default', () => (
  <Api>
    <Container>
      <Map center={{ lat: 24.886, lng: -70.268 }} zoom={5} mapTypeId="terrain">
        <Polygon
          path={triangleCoords}
          strokeColor="#FF0000"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#FF0000"
          fillOpacity={0.35}
        />
      </Map>
    </Container>
  </Api>
));
