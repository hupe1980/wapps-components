import React, { Component } from 'react';
import styled from 'styled-components';
import Scroll from '@wapps/react-scroll';

import Message from './Message';

const ListContainer = styled.div`
  max-height: calc(100vh - 50px);
  overflow: scroll;
`;

class MessageList extends Component {
  render() {
    const { messages } = this.props;

    return (
      <ListContainer>
        {messages.map((message, index) => (
          <Scroll key={index} behavior="smooth" scrollMode="if-needed">
            <Message {...message} />
          </Scroll>
        ))}
      </ListContainer>
    );
  }
}

export default MessageList;
