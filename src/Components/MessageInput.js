import React, { useState } from 'react';
import { sendMessage } from '../Services/api.js';
import { sendNotificationNewMessage } from '../Services/websocket.js';

const MessageInput = ({ profile, chat, handleError }) => {
  
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
      if (input.trim()) {

        const message = {
          sender: profile.email, 
          content : input.trim(),
          timestamp: new Date().toISOString(),
          chat: chat
        };

        sendMessage(
            message,
            (response) => { 
                handleMessageSent(response); 
                setInput('');
            },
            (errorMessage) => handleError(errorMessage)
        );
      }
  };

  const handleMessageSent = ( response ) => {

    console.log("handleMessageSent")

    let idMessage = response.data.id;

    if(idMessage){
      sendNotificationNewMessage(
          idMessage , 
          () => { console.log("Error"); } );
    }
}

  return (
    <div className="fixed-bottom-height bg-custom-blue input-group p-2 rounded-bottom-3 rounded-start-0">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        className='form-control border-secondary'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        disabled={chat === null}
      />
      <button onClick={handleSendMessage}
        className='btn btn-outline-light'>Send</button>
    </div>
  );
};

export default MessageInput;