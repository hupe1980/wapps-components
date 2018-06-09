import React, { Component } from 'react';

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
    const { text } = this.props;

    return (
      <div
        style={{ backgroundColor: 'blue', color: 'white' }}
        ref={this.nodeRef}
      >
        {text}
      </div>
    );
  }
}

export default Loop;
