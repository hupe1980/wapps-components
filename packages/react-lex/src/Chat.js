import React from 'react';

import Message from './Message';

const Chat = ({ inputText, messages, onChange, onSubmit }) => (
  <div>
    <div>
      {messages.map(({ message }, index) => <Message key={index}>{message}</Message>)}
    </div>
    <form onSubmit={onSubmit}>
      <input type="text" value={inputText} onChange={onChange} />
    </form>
  </div>
);

export default Chat;
