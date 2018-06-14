import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createClient } from 'contentful';

import { ContentfulContext } from './context';

const propTypes = {
  space: PropTypes.string.isRequired,
  environment: PropTypes.string,
  accessToken: PropTypes.string,
};

const defaultProps = {
  environment: 'master',
};

class Contentful extends Component {
  constructor(props) {
    super(props);

    const { space, environment, accessToken, ...rest } = props;

    this.client = createClient({
      space,
      environment,
      accessToken,
    });

    this.rest = rest;
  }

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
