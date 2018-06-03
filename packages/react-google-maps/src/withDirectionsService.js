import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const propTypes = {
  request: PropTypes.object.isRequired,
};

const getDisplayName = name => `withDirectionsService(${name})`;

const withDirectionsService = WrappedComponent => {
  class DirectionsService extends Component {
    constructor(props) {
      super(props);

      const { api } = this.props;
      this.directionsService = new api.DirectionsService();

      this.state = {
        directions: null,
      };
    }

    componentDidMount() {
      this.fetchDirections();
    }

    componentDidUpdate(prevProps) {
      const { request } = this.props;

      if (request !== prevProps.request) {
        this.fetchDirections();
      }
    }

    fetchDirections = () => {
      const { api, request } = this.props;

      this.directionsService.route(request, (result, status) => {
        if (status === api.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      });
    };

    render() {
      const { directions } = this.state;

      if (!directions) return null;

      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  DirectionsService.displayName = getDisplayName(name);
  DirectionsService.WrappedComponent = WrappedComponent;
  DirectionsService.propTypes = propTypes;

  return hoistStatics(DirectionsService, WrappedComponent);
};

export default withDirectionsService;
