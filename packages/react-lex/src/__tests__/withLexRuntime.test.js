import { Component } from 'react';

import withLexRuntime from '../withLexRuntime';

describe('withLexRuntime', () => {
  it('should hoist non react statics', () => {
    class WrappedComponent extends Component {
      static foo = 'bar';

      render() {
        return null;
      }
    }

    const LexComponent = withLexRuntime(WrappedComponent);

    expect(LexComponent.displayName).toEqual(
      'withLexRuntime(WrappedComponent)',
    );
    expect(LexComponent.foo).toEqual('bar');
  });
});
