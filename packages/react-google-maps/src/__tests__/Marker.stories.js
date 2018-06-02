import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Marker from '../Marker';

storiesOf('Marker', module).add('with Marker', () => (
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
        />
      </Map>
    </Container>
  </Api>
));
