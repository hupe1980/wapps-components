import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import FusionTablesLayer from '../FusionTablesLayer';

storiesOf('react-google-maps|FusionTablesLayer', module)
  .add('default', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 41.850033,
            lng: -87.6500523,
          }}
          zoom={11}
        >
          <FusionTablesLayer
            query={{
              select: 'Geocodable address',
              from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg',
            }}
          />
        </Map>
      </Container>
    </Api>
  ))
  .add('with heatmap', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 10,
            lng: -140,
          }}
          zoom={3}
        >
          <FusionTablesLayer
            query={{
              select: 'location',
              from: '1xWyeuAhIFK_aED1ikkQEGmR8mINSCJO9Vq-BPQ',
            }}
            heatmap={{
              enabled: true,
            }}
          />
        </Map>
      </Container>
    </Api>
  ))
  .add('with styling', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: -25,
            lng: 133,
          }}
          zoom={4}
        >
          <FusionTablesLayer
            query={{
              select: 'geometry',
              from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
            }}
            styles={[
              {
                polygonOptions: {
                  fillColor: '#00FF00',
                  fillOpacity: 0.3,
                },
              },
              {
                where: 'birds > 300',
                polygonOptions: {
                  fillColor: '#0000FF',
                },
              },
              {
                where: 'population > 5',
                polygonOptions: {
                  fillOpacity: 1.0,
                },
              },
            ]}
          />
        </Map>
      </Container>
    </Api>
  ));
