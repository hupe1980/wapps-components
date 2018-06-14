import { Component } from 'react';
import PropTypes from 'prop-types';

import { withContentfulContext } from './context';

const propTypes = {
  client: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
};

const defaultProps = {};

class Entries extends Component {
  state = {
    error: null,
    items: [],
  };

  componentDidMount() {
    const { client, query } = this.props;

    client
      .getEntries(query)
      .then(({ items }) =>
        this.setState({
          items,
        }),
      )
      .catch(error =>
        this.setState({
          error,
        }),
      );
  }

  render() {
    return this.props.children(this.state);
  }
}

Entries.propTypes = propTypes;
Entries.defaultProps = defaultProps;

export default withContentfulContext(Entries);
