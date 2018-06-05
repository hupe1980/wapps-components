import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../../Map';
import Automcomplete from '../Autocomplete';

storiesOf('react-google-maps.places|Automcomplete', module)
  .add('default', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={10}
        >
          <Automcomplete />
        </Map>
      </Container>
    </Api>
  ))
  .add('with controlPosition', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={10}
        >
          <Automcomplete controlPosition="TOP_LEFT" />
        </Map>
      </Container>
    </Api>
  ));
