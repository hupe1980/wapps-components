import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import BicyclingLayer from '../BicyclingLayer';

storiesOf('react-google-maps|BicyclingLayer', module).add('default', () => (
  <Api>
    <Container>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={13}
      >
        <BicyclingLayer />
      </Map>
    </Container>
  </Api>
));
