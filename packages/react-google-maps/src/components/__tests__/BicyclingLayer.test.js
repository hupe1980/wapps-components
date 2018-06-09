import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import BicyclingLayer from '../BicyclingLayer';

describe('BicyclingLayer', () => {
  let googleMaps;
  let map;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
    map = new googleMaps.Map();
  });

  it('should create a marker and attach it to map on mount', () => {
    const options = {
      map,
    };

    mount(<BicyclingLayer googleMaps={googleMaps} map={map} />);

    expect(googleMaps.BicyclingLayer).toHaveBeenCalledTimes(1);
    expect(googleMaps.BicyclingLayer.mock.instances.length).toBe(1);
    expect(googleMaps.BicyclingLayer).toHaveBeenLastCalledWith();

    const layer = googleMaps.BicyclingLayer.mock.instances[0];
    expect(layer.setValues).toHaveBeenCalledTimes(1);
    expect(layer.setValues).toHaveBeenLastCalledWith(options);
  });
});
