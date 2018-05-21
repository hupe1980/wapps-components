import React from 'react';

const Chat = ({ inputText, messages, onChange, onSubmit }) => (
  <div>
    <div>
      {messages.map(({ message }, index) => <p key={index}>{message}</p>)}
    </div>
    <form onSubmit={onSubmit}>
      <input type="text" value={inputText} onChange={onChange} />
    </form>
  </div>
);

export default Chat;
