import React, { Component } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
};

class StartStop extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    this.context = canvas.getContext('2d');
    this.progress = 0;
    this.cw = this.context.canvas.width / 2;
    this.ch = this.context.canvas.height / 2;
  }

  onAnimationFrame() {
    const start = 4.72;
    this.diff = this.progress / 100 * Math.PI * 2;
    this.context.clearRect(0, 0, 400, 200);
    this.context.beginPath();
    this.context.arc(this.cw, this.ch, 50, 0, 2 * Math.PI, false);
    this.context.fillStyle = '#FFF';
    this.context.fill();
    this.context.strokeStyle = '#e7f2ba';
    this.context.stroke();
    this.context.fillStyle = '#000';
    this.context.strokeStyle = '#b3cf3c';
    this.context.textAlign = 'center';
    this.context.lineWidth = 15;
    this.context.font = '10pt Verdana';
    this.context.beginPath();
    this.context.arc(this.cw, this.ch, 50, start, this.diff + start, false);
    this.context.stroke();
    this.context.fillText(this.progress + '%', this.cw + 2, this.ch + 6);

    if (this.progress >= 100) {
      this.progress = 0;
    }

    this.progress++;
  }

  start = () => {
    this.props.startAnimation();
  };

  stop = () => {
    this.props.stopAnimation();
  };

  render() {
    return (
      <div style={styles.container}>
        <canvas ref="canvas" width="300" height="300" />
        <div style={styles.buttons}>
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
        </div>
      </div>
    );
  }
}

export default StartStop;
