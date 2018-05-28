import React from 'react';
import styled, { css } from 'styled-components';

import PlainTextMessage from './PlainTextMessage';

const botStyle = css`
  color: #fff;
  background: #075698;
  background: linear-gradient(#2e88c4, #075698);
  margin-left: 50px;
`;

const humanStyle = css`
  color: #fff;
  background: #c81e2b;
  background: linear-gradient(#f04349, #c81e2b);
  margin-right: 50px;
`;

const Container = styled.div`
  position: relative;
  padding: 5px;
  border-radius: 10px;
  margin: 1em 0;
  word-wrap: break-word;
  ${({ type }) => (type === 'bot' ? botStyle : humanStyle)};
`;

const Message = ({ text, type }) => (
  <Container type={type}>
    <PlainTextMessage text={text} />
  </Container>
);

export default Message;
