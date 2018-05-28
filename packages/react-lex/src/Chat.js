import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import MessageList from './MessageList';
import Input from './Input';

const propTypes = {
  theme: PropTypes.object,
};

const defaultProps = {
  theme: {},
};

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid;
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 1em;
`;

const Chat = ({ messages, theme, ...rest }) => (
  <ThemeProvider theme={theme}>
    <Root>
      <Container>
        <MessageList messages={messages} />
        <Input {...rest} />
      </Container>
    </Root>
  </ThemeProvider>
);

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

export default Chat;
