import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import TrafficLayer from '../TrafficLayer';

storiesOf('react-google-maps|TrafficLayer', module)
  .add('default', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
        >
          <TrafficLayer />
        </Map>
      </Container>
    </Api>
  ))
  .add('with autoRefresh', () => (
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
