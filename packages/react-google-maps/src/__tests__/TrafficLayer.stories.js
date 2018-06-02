import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import TrafficLayer from '../TrafficLayer';

storiesOf('TrafficLayer', module).add('with TrafficLayer', () => (
  <Api>
    <Container>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={15}
      >
        <TrafficLayer autoRefresh />
      </Map>
    </Container>
  </Api>
));
