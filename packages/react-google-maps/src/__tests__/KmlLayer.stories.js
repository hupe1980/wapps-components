import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import KmlLayer from '../KmlLayer';

storiesOf('react-google-maps|KmlLayer', module).add('default', () => (
  <Api>
    <Container>
      <Map center={{ lat: 41.876, lng: -87.624 }} zoom={11}>
        <KmlLayer url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml" />
      </Map>
    </Container>
  </Api>
));
