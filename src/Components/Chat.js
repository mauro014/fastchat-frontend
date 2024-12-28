import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage } from '../Services/websocket.js';
import { getAllMessages } from '../Services/api.js';
import MessageList from './MessageList.js';
import MessageInput from './MessageInput.js';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    getAllMessages().then((allMessages) => setMessages(allMessages));

    connectWebSocket((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

  }, []);

  const handleSendMessage = (content, user) => {
    const message = {
      sender: user, 
      content,
      timestamp: new Date().toISOString(),
    };
    sendMessage(message);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;