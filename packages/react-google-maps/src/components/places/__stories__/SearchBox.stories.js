import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../../Map';
import SearchBox from '../SearchBox';

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

storiesOf('react-google-maps.places|SearchBox', module)
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
          <SearchBox>
            <input type="text" style={styles} />
          </SearchBox>
        </Map>
      </Container>
    </Api>
  ))
  .add('without Map', () => (
    <Api>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBox
          onPlacesChanged={searchBox => {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
              return;
            }

            alert(JSON.stringify(places));
          }}
        >
          <input type="text" style={styles} />
        </SearchBox>
      </div>
    </Api>
  ))
  .add('without children', () => (
    <Api>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBox
          onPlacesChanged={searchBox => {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
              return;
            }

            alert(JSON.stringify(places));
          }}
        />
      </div>
    </Api>
  ));
