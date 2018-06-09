# react-animation-frame
React higher-order component for managing recurring animation frames

## Example
```js
import React, { Component } from 'react';
import withAnimationFrame from '@wapps/react-animation-frame';

class Loop extends Component {
  constructor(props) {
    super(props);

    this.nodeRef = React.createRef();
    this.startTime = performance.now();
  }

  onAnimationFrame(time) {
    const { duration } = this.props;
    const progress = (time - this.startTime) / duration * 100;

    if (progress >= 100) {
      this.startTime = performance.now();
      return;
    }

    const node = this.nodeRef.current;
    node.style.width = `${progress}%`;
  }

  render() {
    return (
      <div
        style={{ backgroundColor: 'blue', color: 'white' }}
        ref={this.nodeRef}
      >
        Loop
      </div>
    );
  }
}

export default withAnimationFrame(Loop);
```

## Installation
- `npm install --save @wapps/react-animation-frame`

## Live Demo
For a demo, check out https://hupe1980.github.io/wapps-components/
