import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import TransitLayer from '../TransitLayer';

describe('TransitLayer', () => {
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

    mount(<TransitLayer googleMaps={googleMaps} map={map} />);

    expect(googleMaps.TransitLayer).toHaveBeenCalledTimes(1);
    expect(googleMaps.TransitLayer.mock.instances.length).toBe(1);
    expect(googleMaps.TransitLayer).toHaveBeenLastCalledWith();

    const layer = googleMaps.TransitLayer.mock.instances[0];
    expect(layer.setValues).toHaveBeenCalledTimes(1);
    expect(layer.setValues).toHaveBeenLastCalledWith(options);
  });
});
