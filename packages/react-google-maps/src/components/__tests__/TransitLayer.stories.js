import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import TransitLayer from '../TransitLayer';

storiesOf('react-google-maps|TransitLayer', module).add('default', () => (
  <Api>
    <Container>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={13}
      >
        <TransitLayer />
      </Map>
    </Container>
  </Api>
));
