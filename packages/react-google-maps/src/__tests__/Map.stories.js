import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Api, Container } from './helper';
import Map from '../Map';

const Row = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'row', height: '95vh' }}>
    {children}
  </div>
);

const Cell = ({ children }) => (
  <div style={{ width: '50%', margin: '5px' }}>{children}</div>
);

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

storiesOf('Map', module)
  .add('with Map', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
        />
      </Container>
    </Api>
  ))
  .add('with two Maps', () => (
    <Api>
      <Row>
        <Cell>
          <Map
            center={{
              lat: 52.520008,
              lng: 13.404954,
            }}
            zoom={15}
          />
        </Cell>
        <Cell>
          <Map
            center={{
              lat: 52.520008,
              lng: 13.404954,
            }}
            zoom={15}
          />
        </Cell>
      </Row>
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
          onClick={action('onClick')}
        />
      </Container>
    </Api>
  ))
  .add('with mapStyles', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 52.520008,
            lng: 13.404954,
          }}
          zoom={15}
          styles={mapStyles}
        />
      </Container>
    </Api>
  ));
