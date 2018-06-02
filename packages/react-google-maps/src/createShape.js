import React, { Component } from 'react';

const createShape = type => props => {
  class Shape extends Component {
    componentDidMount() {
      this.renderShape();
    }

    componentWillUnmount() {
      if (this.shape) {
        this.shape.setMap(null);
        this.shape = null;
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.map !== prevProps.map) {
        this.renderShape();
      }
    }

    renderShape = () => {
      const { api, map, ...rest } = this.props;

      if (!api) {
        return;
      }

      this.shape = new api[type]({
        ...rest,
      });

      this.shape.setMap(map);
    };

    render() {
      return null;
    }
  }

  return <Shape {...props} />;
};

export default createShape;
