import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import OverlayView from '../OverlayView';

storiesOf('OverlayView', module).add('with OverlayView', () => (
  <Api>
    <Container>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={15}
      >
        <OverlayView
          position={{
            lat: 52.520008,
            lng: 13.404954,
          }}
        >
          <div
            style={{ backgroundColor: 'blue', color: 'white', padding: '15px' }}
          >
            Hello!
          </div>
        </OverlayView>
      </Map>
    </Container>
  </Api>
));
