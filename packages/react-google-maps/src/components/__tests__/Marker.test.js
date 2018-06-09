import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import Marker from '../Marker';

describe('Marker', () => {
  let googleMaps;
  let map;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
    map = new googleMaps.Map();
  });

  it('should create a marker and attach it to map on mount', () => {
    const options = {
      map,
      position: { lat: 52.520008, lng: 13.404954 },
    };

    mount(
      <Marker
        googleMaps={googleMaps}
        map={map}
        position={{ lat: 52.520008, lng: 13.404954 }}
      />,
    );

    expect(googleMaps.Marker).toHaveBeenCalledTimes(1);
    expect(googleMaps.Marker.mock.instances.length).toBe(1);
    expect(googleMaps.Marker).toHaveBeenLastCalledWith();

    const marker = googleMaps.Marker.mock.instances[0];
    expect(marker.setValues).toHaveBeenCalledTimes(1);
    expect(marker.setValues).toHaveBeenLastCalledWith(options);
  });
});
