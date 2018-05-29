import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import withScriptLoader from '../withScriptLoader';

class WrappedComponent extends Component {
  static foo = 'bar';

  render() {
    return <div />;
  }
}

describe('withScriptLoader', () => {
  it('should hoist non react statics', () => {
    const ScriptLoader = withScriptLoader(/** none **/)(WrappedComponent);

    expect(ScriptLoader.displayName).toEqual(
      'withScriptLoader(WrappedComponent)',
    );
    expect(ScriptLoader.foo).toEqual('bar');
  });

  it('has a append a script tag', () => {
    const ScriptLoader = withScriptLoader({
      src: 'http://scriptsrc/',
      async: true,
    })(WrappedComponent);

    mount(<ScriptLoader />);

    const script = document.querySelector('script');
    expect(script.src).toEqual('http://scriptsrc/');
    expect(script.async).toEqual(true);
  });
});
