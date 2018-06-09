import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import DirectionsRenderer from '../DirectionsRenderer';

storiesOf('react-google-maps|DirectionsRenderer', module)
  .add('default', () => (
    <Api>
      <Container>
        <Map center={{ lat: 40.771, lng: -73.974 }} zoom={13}>
          <DirectionsRenderer
            request={{
              origin: 'penn station, new york, ny',
              destination: '260 Broadway New York NY 10007',
              travelMode: 'walking',
            }}
          />
        </Map>
      </Container>
    </Api>
  ))
  .add('without Map (children)', () => (
    <Api>
      <Container>
        <DirectionsRenderer
          request={{
            origin: 'penn station, new york, ny',
            destination: '260 Broadway New York NY 10007',
            travelMode: 'driving',
          }}
        >
          <div />
        </DirectionsRenderer>
      </Container>
    </Api>
  ))
  .add('without Map (panel)', () => (
    <Api>
      <Container>
        <DirectionsRenderer
          panel="#panel"
          request={{
            origin: 'penn station, new york, ny',
            destination: '260 Broadway New York NY 10007',
            travelMode: 'driving',
          }}
        />
        <div id="panel" />
      </Container>
    </Api>
  ))
  .add('with Map & Text', () => (
    <Api>
      <div
        id="panel"
        style={{
          height: '100vh',
          float: 'right',
          width: '390px',
          overflow: 'auto',
        }}
      />
      <div style={{ height: '100vh', marginRight: '400px' }}>
        <Map center={{ lat: 40.771, lng: -73.974 }} zoom={13}>
          <DirectionsRenderer
            panel="#panel"
            request={{
              origin: 'penn station, new york, ny',
              destination: '260 Broadway New York NY 10007',
              travelMode: 'driving',
            }}
          />
        </Map>
      </div>
    </Api>
  ))
  .add('with two renderer', () => (
    <Api>
      <DirectionsRenderer
        request={{
          origin: 'penn station, new york, ny',
          destination: '260 Broadway New York NY 10007',
          travelMode: 'driving',
        }}
      >
        <div
          id="panel"
          style={{
            height: '100vh',
            float: 'right',
            width: '390px',
            overflow: 'auto',
          }}
        />
      </DirectionsRenderer>
      <div style={{ height: '100vh', marginRight: '400px' }}>
        <Map center={{ lat: 40.771, lng: -73.974 }} zoom={13}>
          <DirectionsRenderer
            request={{
              origin: 'penn station, new york, ny',
              destination: '260 Broadway New York NY 10007',
              travelMode: 'driving',
            }}
          />
        </Map>
      </div>
    </Api>
  ));
