import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Api, Container } from './helper';
import Map from '../Map';
import Marker from '../Marker';

storiesOf('react-google-maps|Marker', module)
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
          <Marker
            position={{
              lat: 52.520008,
              lng: 13.404954,
            }}
            icon={<div>Test</div>}
          />
        </Map>
      </Container>
    </Api>
  ))
  .add('with animation(bounce)', () => (
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
            animation="bounce"
          />
        </Map>
      </Container>
    </Api>
  ))
  .add('with animation(drop)', () => (
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
            animation="drop"
          />
        </Map>
      </Container>
    </Api>
  ))
  .add('with onClick', () => (
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
            onClick={action('onClick')}
          />
        </Map>
      </Container>
    </Api>
  ));
