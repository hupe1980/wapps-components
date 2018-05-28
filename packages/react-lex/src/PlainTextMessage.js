import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  margin: 0;
`;

const PlainTextMessage = ({ text }) => <Text>{text}</Text>;

export default PlainTextMessage;
