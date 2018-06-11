import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import StreetViewPanorama from '../StreetViewPanorama';

const fenway = { lat: 42.345573, lng: -71.098326 };

storiesOf('react-google-maps|StreetViewPanorama', module)
  .add('default', () => (
    <Api>
      <Container>
        <StreetViewPanorama
          position={{ lat: 37.86926, lng: -122.254811 }}
          pov={{ heading: 165, pitch: 0 }}
          zoom={1}
        />
      </Container>
    </Api>
  ))
  .add('with side-by-side', () => (
    <Api>
      <div
        style={{
          height: '100vh',
          width: '100wh',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Map
          center={fenway}
          zoom={14}
          mapDiv={<div style={{ height: '100%', width: '50%' }} />}
        >
          <StreetViewPanorama
            position={fenway}
            pov={{ heading: 34, pitch: 10 }}
            container={<div style={{ height: '100%', width: '50%' }} />}
          />
        </Map>
      </div>
    </Api>
  ));
