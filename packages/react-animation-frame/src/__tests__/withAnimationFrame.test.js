import { Component } from 'react';

import withAnimationFrame from '../withAnimationFrame';

describe('withAnimationFrame', () => {
  it('should hoist non react statics', () => {
    class WrappedComponent extends Component {
      static foo = 'bar';

      render() {
        return null;
      }
    }

    const AnimatedComponent = withAnimationFrame(WrappedComponent);

    expect(AnimatedComponent.displayName).toEqual(
      'withAnimationFrame(WrappedComponent)',
    );
    expect(AnimatedComponent.foo).toEqual('bar');
  });
});
