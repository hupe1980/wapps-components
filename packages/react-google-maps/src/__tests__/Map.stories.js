import React from 'react';
import { storiesOf } from '@storybook/react';

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
  ));
