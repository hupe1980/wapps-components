import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { MapContext, withApiContext } from './Context';

const propTypes = {};

const defaultProps = {};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const { api } = this.props;
    if (api) this.loadMap();
  }

  componentDidUpdate(prevProps) {
    const { api } = this.props;
    if (api) this.loadMap();
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.setState({ map: null });
    }
  }

  loadMap = () => {
    if (this.state.map) return;

    const { api, ...rest } = this.props;
    const node = this.mapRef.current;

    const map = new api.Map(node, {
      ...rest,
    });

    api.event.trigger(map, 'ready');

    this.setState({ map });
  };

  render() {
    const { map } = this.state;
    const { children } = this.props;

    return (
      <MapContext.Provider value={map}>
        <Fragment>
          <div style={{ height: '100%' }} ref={this.mapRef} role="application">
            Loading map...
          </div>
          {children}
        </Fragment>
      </MapContext.Provider>
    );
  }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default withApiContext(Map);
