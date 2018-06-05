import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import DirectionsRenderer from '../DirectionsRenderer';

storiesOf('react-google-maps|DirectionsRenderer', module).add('default', () => (
  <Api>
    <Container>
      <Map center={{ lat: 40.771, lng: -73.974 }} zoom={13}>
        <DirectionsRenderer
          request={{
            origin: 'penn station, new york, ny',
            destination: '260 Broadway New York NY 10007',
            travelMode: 'walking',
          }}
        />
      </Map>
    </Container>
  </Api>
));
