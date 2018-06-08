import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import Map from '../Map';

describe('Map', () => {
  let googleMaps;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
  });

  it('should attach map to child div', () => {
    const opts = { center: { lat: 0, lng: 1 }, zoom: 10 };

    const wrapper = mount(
      <Map googleMaps={googleMaps} zoom={opts.zoom} center={opts.center} />,
    );

    const mapDiv = wrapper.find('div');

    expect(mapDiv.length).toBe(1);
    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map).toHaveBeenLastCalledWith(mapDiv.getDOMNode(), opts);
  });

  it('should remove all listeners on unmount', () => {
    const opts = { center: { lat: 0, lng: 1 }, zoom: 10 };
    const wrapper = mount(
      <Map
        googleMaps={googleMaps}
        zoom={opts.zoom}
        center={opts.center}
        onClick={() => {}}
      />,
    );

    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledTimes(0);

    wrapper.unmount();

    expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
  });
});
