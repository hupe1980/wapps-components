import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../../Map';
import Automcomplete from '../Autocomplete';

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
          <Automcomplete>
            <input type="text" style={styles} />
          </Automcomplete>
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
          <Automcomplete controlPosition="TOP_LEFT">
            <input type="text" style={styles} />
          </Automcomplete>
        </Map>
      </Container>
    </Api>
  ))
  .add('without Map', () => (
    <Api>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Automcomplete
          onPlaceChanged={autocomplete => {
            const place = autocomplete.getPlace();
            alert(JSON.stringify(place));
          }}
        >
          <input type="text" style={styles} />
        </Automcomplete>
      </div>
    </Api>
  ));
