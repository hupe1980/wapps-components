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
        map={options.map}
        position={options.position}
      />,
    );

    expect(googleMaps.Marker).toHaveBeenCalledTimes(1);
    expect(googleMaps.Marker.mock.instances.length).toBe(1);
    expect(googleMaps.Marker).toHaveBeenLastCalledWith();

    const marker = googleMaps.Marker.mock.instances[0];
    expect(marker.setValues).toHaveBeenCalledTimes(1);
    expect(marker.setValues).toHaveBeenLastCalledWith(options);
  });

  it('should remove from map on unmount', () => {
    const options = {
      map,
      position: { lat: 52.520008, lng: 13.404954 },
    };

    const wrapper = mount(
      <Marker
        googleMaps={googleMaps}
        map={options.map}
        position={options.position}
        onClick={() => {}}
      />,
    );

    expect(googleMaps.Marker).toHaveBeenCalledTimes(1);

    const marker = googleMaps.Marker.mock.instances[0];

    expect(marker.setMap).toHaveBeenCalledTimes(0);
    expect(marker.setValues).toHaveBeenCalledTimes(1);
    expect(marker.setValues).toHaveBeenLastCalledWith(options);

    wrapper.unmount();

    expect(marker.setMap).toHaveBeenCalledTimes(1);
    expect(marker.setMap).toHaveBeenLastCalledWith(null);

    expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
    expect(googleMaps.event.clearInstanceListeners).toHaveBeenLastCalledWith(
      marker,
    );
  });
});
