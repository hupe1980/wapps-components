import React, { Component } from 'react';

const createLayer = type => props => {
  class Layer extends Component {
    componentDidMount() {
      this.renderLayer();
    }

    componentWillUnmount() {
      if (this.layer) {
        this.layer.setMap(null);
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.map !== prevProps.map) {
        this.renderLayer();
      }
    }

    renderLayer = () => {
      const { api, map, ...rest } = this.props;

      if (!api) {
        return;
      }

      this.layer = new api[type]({
        ...rest,
      });

      this.layer.setMap(map);
    };

    render() {
      return null;
    }
  }

  return <Layer {...props} />;
};

export default createLayer;
