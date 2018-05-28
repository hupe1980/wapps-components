import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 1em 0 0;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 5px;
`;

const Input = ({ inputText, onChange, onSubmit, placeholder }) => (
  <Container>
    <form onSubmit={onSubmit}>
      <TextInput
        id="textInput"
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={onChange}
      />
    </form>
  </Container>
);

export default Input;
