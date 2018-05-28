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
      messages.push({ type: 'bot', text: initialText });
      this.setState({ inputText: '', messages });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { inputText, messages } = this.state;
    const { onResponse, onError, postText } = this.props;

    if (!inputText) return;

    messages.push({ type: 'human', text: inputText });
    this.setState({ inputText: '', messages });

    postText(inputText)
      .then(data => {
        console.log(data);
        const { dialogState, message, messageFormat } = data;

        messages.push({
          type: 'bot',
          text: message,
          format: messageFormat,
          dialogState,
        });
        this.setState({ messages });

        onResponse && onResponse(data);
      })
      .catch(error => onError && onError(error));
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ inputText: event.target.value });
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
