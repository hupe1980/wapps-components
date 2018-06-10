import React from 'react';
import { storiesOf } from '@storybook/react';
import withState from '@wapps/storybook-addon-state';

import { Api, Container, RemoveRestorePanel } from './helper';
import Map from '../Map';
import GroundOverlay from '../GroundOverlay';

const imageBounds = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655,
};

storiesOf('react-google-maps|GroundOverlay', module)
  .add('default', () => (
    <Api>
      <Container>
        <Map
          center={{
            lat: 40.74,
            lng: -74.18,
          }}
          zoom={13}
        >
          <GroundOverlay
            url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
            bounds={imageBounds}
          />
        </Map>
      </Container>
    </Api>
  ))
  .add(
    'with remove/restore',
    withState({ visible: true })(({ store }) => (
      <Api>
        <Container>
          <RemoveRestorePanel
            onRemoveClick={() => store.set({ visible: false })}
            onRestoreClick={() => store.set({ visible: true })}
          />
          <Map
            center={{
              lat: 40.74,
              lng: -74.18,
            }}
            zoom={13}
          >
            <GroundOverlay
              visible={store.state.visible}
              url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
              bounds={imageBounds}
            />
          </Map>
        </Container>
      </Api>
    )),
  );
