import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import TrafficLayer from '../TrafficLayer';

describe('TrafficLayer', () => {
  let googleMaps;
  let map;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
    map = new googleMaps.Map();
  });

  it('should create a marker and attach it to map on mount', () => {
    mount(<TrafficLayer googleMaps={googleMaps} map={map} />);

    expect(googleMaps.TrafficLayer).toHaveBeenCalledTimes(1);
    expect(googleMaps.TrafficLayer.mock.instances.length).toBe(1);
    expect(googleMaps.TrafficLayer).toHaveBeenLastCalledWith();

    const layer = googleMaps.TrafficLayer.mock.instances[0];
    expect(layer.setMap).toHaveBeenCalledTimes(1);
    expect(layer.setMap).toHaveBeenLastCalledWith(map);
    expect(layer.setValues).toHaveBeenCalledTimes(1);
    expect(layer.setMap).toHaveBeenLastCalledWith(map);
  });
});
