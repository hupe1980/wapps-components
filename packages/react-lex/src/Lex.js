import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withLexRuntime from './withLexRuntime';

import Chat from './Chat';

const propTypes = {
  initialText: PropTypes.string,
  onResponse: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  initialText: '',
  onResponse: null,
  onError: null,
  children: <Chat />,
};

class Lex extends Component {
  state = {
    inputText: '',
    messages: [],
  };

  componentDidMount() {
    const { initialText } = this.props;
    const { messages } = this.state;

    if (initialText) {
      messages.push({ type: 'bot', message: initialText });
      this.setState({ inputText: '', messages });
    }
  }

  handleSubmit = event => {
    const { inputText, messages } = this.state;
    const { onResponse, onError } = this.props;

    messages.push({ type: 'human', message: inputText });
    this.setState({ inputText: '', messages });
    this.props
      .postText(inputText)
      .then(data => {
        const { message } = data;

        messages.push({ type: 'bot', message });
        this.setState({ messages });

        onResponse && onResponse(data);
      })
      .catch(error => onError && onError(error));

    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ inputText: event.target.value });
    event.preventDefault();
  };

  render() {
    const { inputText, messages } = this.state;
    const { children, ...rest } = this.props;

    return React.cloneElement(children, {
      inputText: inputText,
      messages: messages,
      onChange: this.handleChange,
      onSubmit: this.handleSubmit,
      ...rest,
    });
  }
}

Lex.propTypes = propTypes;
Lex.defaultProps = defaultProps;

export default withLexRuntime(Lex);