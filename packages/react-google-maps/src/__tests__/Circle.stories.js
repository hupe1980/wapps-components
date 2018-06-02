import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api, Container } from './helper';
import Map from '../Map';
import Circle from '../Circle';

// This example creates circles on the map, representing populations in North
// America.

// First, create an object containing LatLng and population for each city.
const citymap = [
  {
    center: { lat: 41.878, lng: -87.629 },
    population: 2714856,
    city: 'chicago',
  },
  {
    center: { lat: 40.714, lng: -74.005 },
    population: 8405837,
    city: 'newyork',
  },
  {
    center: { lat: 34.052, lng: -118.243 },
    population: 3857799,
    city: 'losangeles',
  },
  {
    center: { lat: 49.25, lng: -123.1 },
    population: 603502,
    city: 'vancouver',
  },
];

storiesOf('Circle', module).add('with Circle', () => (
  <Api>
    <Container>
      <Map center={{ lat: 37.09, lng: -95.712 }} zoom={4} mapTypeId="terrain">
        {/* Construct the circle for each value in citymap.
        Note: We scale the area of the circle based on the population. */}
        {citymap.map(({ center, city, population }) => (
          // Add the circle for this city to the map.
          <Circle
            key={city}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#FF0000"
            fillOpacity={0.35}
            center={center}
            radius={Math.sqrt(population) * 100}
          />
        ))}
      </Map>
    </Container>
  </Api>
));
