import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Geolocation from '../Geolocation';

storiesOf('react-google-maps|Geolocation', module)
  .add('default', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={13}
        >
          <Geolocation onError={() => alert('Geolocation failure!')} />
        </Map>
      </Container>
    </Api>
  ))
  .add('with setCenter', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={13}
        >
          <Geolocation
            usePanTo={false}
            onError={() => alert('Geolocation failure!')}
          />
        </Map>
      </Container>
    </Api>
  ));
