import React, { Component } from 'react';

const styles = {
  bar: {
    backgroundColor: 'blue',
    color: 'white',
    width: '0%',
  },
};

class Loop extends Component {
  constructor(props) {
    super(props);
    this.startTime = performance.now();
  }

  onAnimationFrame(time) {
    const { duration } = this.props;
    const progress = (time - this.startTime) / duration * 100;

    if (progress >= 100) {
      this.startTime = performance.now();
    }

    this.refs.bar.style.width = `${progress}%`;
  }

  render() {
    const { text } = this.props;

    return (
      <div style={styles.bar} ref="bar">
        {text}
      </div>
    );
  }
}

export default Loop;
