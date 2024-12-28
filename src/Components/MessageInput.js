import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  
  const [input, setInput] = useState('');
  const [user, setUser] = useState('');

  const handleSend = () => {
    if (input.trim() && user.trim()) {
      onSend(input, user);
      setInput('');
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;