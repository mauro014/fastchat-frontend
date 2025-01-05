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
    <div className="input-group p-2 border-top">
      <input
        type="text"
        placeholder="Type your name"
        className='form-control border-secondary'
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        className='form-control border-secondary'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}
        className='btn btn-primary'>Send</button>
    </div>
  );
};

export default MessageInput;