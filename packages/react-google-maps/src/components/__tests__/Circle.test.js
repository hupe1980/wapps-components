import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import Circle from '../Circle';

describe('Circle', () => {
  let googleMaps;
  let map;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
    map = new googleMaps.Map();
  });

  it('should create a circle and attach it to map on mount', () => {
    mount(<Circle googleMaps={googleMaps} map={map} />);

    expect(googleMaps.Circle).toHaveBeenCalledTimes(1);
    expect(googleMaps.Circle.mock.instances.length).toBe(1);
    expect(googleMaps.Circle).toHaveBeenLastCalledWith();

    const layer = googleMaps.Circle.mock.instances[0];
    expect(layer.setMap).toHaveBeenCalledTimes(1);
    expect(layer.setMap).toHaveBeenLastCalledWith(map);
    expect(layer.setValues).toHaveBeenCalledTimes(1);
    expect(layer.setMap).toHaveBeenLastCalledWith(map);
  });
});
