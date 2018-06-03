import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import KmlLayer from '../KmlLayer';

storiesOf('react-google-maps|KmlLayer', module)
  .add('with kml', () => (
    <Api>
      <Container>
        <Map center={{ lat: 41.876, lng: -87.624 }} zoom={11}>
          <KmlLayer url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml" />
        </Map>
      </Container>
    </Api>
  ))
  .add('with georss', () => (
    <Api>
      <Container>
        <Map center={{ lat: 49.496675, lng: -102.65625 }} zoom={4}>
          <KmlLayer url="http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss" />
        </Map>
      </Container>
    </Api>
  ));
