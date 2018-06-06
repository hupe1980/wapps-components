import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../../Map';
import DrawingManager from '../DrawingManager';

const styles = {
  width: '50%',
  marginTop: '10px',
  padding: '5px',
  border: '1px solid transparent',
  borderRadius: '2px 0 0 2px',
  boxSizing: 'border-box',
  height: '28px',
  outline: 'none',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
};

storiesOf('react-google-maps.drawing|DrawingManager', module)
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
          <DrawingManager />
        </Map>
      </Container>
    </Api>
  ))
  .add('with Options', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={10}
        >
          <DrawingManager
            drawingControlOptions={{
              position: 2,
              drawingModes: ['circle', 'rectangle'],
            }}
          />
        </Map>
      </Container>
    </Api>
  ));
