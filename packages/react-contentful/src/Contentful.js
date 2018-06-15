import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createClient } from 'contentful';

import { ContentfulContext } from './context';

const propTypes = {
  space: PropTypes.string.isRequired,
  environment: PropTypes.string,
  accessToken: PropTypes.string.isRequired,
  insecure: PropTypes.bool,
  host: PropTypes.string,
  basePath: PropTypes.string,
  httpAgent: PropTypes.object,
  httpsAgent: PropTypes.object,
  proxy: PropTypes.object,
  headers: PropTypes.object,
  resolveLinks: PropTypes.bool,
  removeUnresolved: PropTypes.bool,
  retryOnError: PropTypes.bool,
  logHandler: PropTypes.func,
  application: PropTypes.string,
  integration: PropTypes.string,
  timeout: PropTypes.number,
};

const defaultProps = {
  environment: 'master',
  insecure: false,
  host: 'cdn.contentful.com',
  basePath: '',
  httpAgent: undefined,
  httpsAgent: undefined,
  proxy: undefined,
  headers: {},
  resolveLinks: true,
  removeUnresolved: false,
  retryOnError: true,
  logHandler: (level, data) => {},
  application: '',
  integration: '',
  timeout: 30000,
};

class Contentful extends Component {
  constructor(props) {
    super(props);

    const params = this.getParamsFromProps(props);
    this.client = createClient(params);
  }

  getParamsFromProps = props =>
    [
      'space',
      'environment',
      'accessToken',
      'insecure',
      'host',
      'basePath',
      'httpAgent',
      'httpsAgent',
      'proxy',
      'headers',
      'resolveLinks',
      'removeUnresolved',
      'retryOnError',
      'logHandler',
      'application',
      'integration',
      'timeout',
    ].reduce((options, key) => {
      if (props[key]) {
        options[key] = props[key];
      }
      return options;
    }, {});

  render() {
    const { children } = this.props;

    return (
      <ContentfulContext.Provider value={this.client}>
        {children}
      </ContentfulContext.Provider>
    );
  }
}

Contentful.propTypes = propTypes;
Contentful.defaultProps = defaultProps;

export default Contentful;
