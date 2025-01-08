import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="input-group p-2 border-top bg-custom-blue">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        className='form-control border-secondary'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}
        className='btn btn-outline-light'>Send</button>
    </div>
  );
};

export default MessageInput;