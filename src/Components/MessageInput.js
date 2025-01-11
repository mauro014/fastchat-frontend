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
    <div className="fixed-bottom-height bg-custom-blue input-group p-2 rounded-bottom-3 rounded-start-0">
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