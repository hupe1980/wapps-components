import { Component } from 'react';
import PropTypes from 'prop-types';

import { withContentfulContext } from './context';

const propTypes = {
  client: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  query: PropTypes.object,
};

const defaultProps = {
  query: {},
};

class Entry extends Component {
  state = {
    error: null,
    entry: null,
  };

  componentDidMount() {
    const { id, client, query } = this.props;

    client
      .getEntry(id, query)
      .then(entry =>
        this.setState({
          entry,
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

Entry.propTypes = propTypes;
Entry.defaultProps = defaultProps;

export default withContentfulContext(Entry);
