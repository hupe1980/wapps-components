import React from 'react';
import { mount } from 'enzyme';
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

import Map from '../Map';

describe('Map', () => {
  const opts = { center: { lat: 52.520008, lng: 13.404954 }, zoom: 15 };
  let googleMaps;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
  });

  it('should attach map to child div', () => {
    const wrapper = mount(
      <Map googleMaps={googleMaps} zoom={opts.zoom} center={opts.center} />,
    );

    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map.mock.instances.length).toBe(1);

    const mapDiv = wrapper.find('div');
    expect(mapDiv.length).toBe(1);
    expect(googleMaps.Map).toHaveBeenLastCalledWith(mapDiv.getDOMNode());

    const setValuesMock = googleMaps.Map.mock.instances[0].setValues;
    expect(setValuesMock).toHaveBeenCalledTimes(1);
    expect(setValuesMock).toHaveBeenLastCalledWith(opts);
  });

  it('should remove all listeners on unmount', () => {
    const wrapper = mount(
      <Map
        googleMaps={googleMaps}
        zoom={opts.zoom}
        center={opts.center}
        onClick={() => {}}
      />,
    );

    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map.mock.instances.length).toBe(1);
    expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledTimes(0);

    wrapper.unmount();

    expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
  });

  it('pass only changed options to map', () => {
    const wrapper = mount(
      <Map
        googleMaps={googleMaps}
        zoom={opts.zoom}
        center={opts.center}
        onClick={() => {}}
      />,
    );

    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map.mock.instances.length).toBe(1);

    const setValuesMock = googleMaps.Map.mock.instances[0].setValues;
    expect(setValuesMock).toHaveBeenCalledTimes(1);

    wrapper.setProps({ zoom: 5 });
    expect(setValuesMock).toHaveBeenCalledTimes(2);
    expect(setValuesMock).toHaveBeenLastCalledWith({
      zoom: 5,
    });

    // no change
    wrapper.setProps({ zoom: 5 });
    expect(setValuesMock).toHaveBeenCalledTimes(2);
  });
});
