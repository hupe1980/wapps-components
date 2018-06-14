import React from 'react';
import { mount } from 'enzyme';

import StripeCheckout from '../StripeCheckout';

jest.mock('../withStripeCheckoutApi', () => component => component);

describe('StripeCheckout', () => {
  beforeEach(() => {
    window.StripeCheckout = {
      configure: jest.fn(),
    };
  });

  it('should create a stripe checkout handler', () => {
    const apiKey = 'testApiKEy';
    const wrapper = mount(<StripeCheckout apiKey={apiKey} />);

    wrapper.setProps({
      hasScriptsLoaded: true,
      hasScriptsLoadedSuccessfully: true,
    });

    expect(window.StripeCheckout.configure).toHaveBeenCalledTimes(1);
    expect(window.StripeCheckout.configure).toHaveBeenLastCalledWith({
      key: apiKey,
    });
  });
});
