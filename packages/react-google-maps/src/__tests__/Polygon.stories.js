import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Rectangle from '../Rectangle';

storiesOf('Rectangle', module).add('with Rectangle', () => (
  <Api>
    <Container>
      <Map
        center={{ lat: 33.678, lng: -116.243 }}
        zoom={11}
        mapTypeId="terrain"
      >
        <Rectangle
          strokeColor="#FF0000"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#FF0000"
          fillOpacity={0.35}
          bounds={{
            north: 33.685,
            south: 33.671,
            east: -116.234,
            west: -116.251,
          }}
        />
      </Map>
    </Container>
  </Api>
));
