import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage, deleteAllMessages } from '../Services/websocket.js';
import { getAllMessages } from '../Services/api.js';
import MessageList from './MessageList.js';
import MessageInput from './MessageInput.js';
import Header from './Header.js';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    getAllMessages().then((allMessages) => setMessages(allMessages));

    connectWebSocket(
      (newMessage) => { 
        setMessages((prevMessages) => [...prevMessages, newMessage]); }
        , () => setMessages([])
    );

  }, []);

  const handleSendMessage = (content, user) => {
    const message = {
      sender: user, 
      content,
      timestamp: new Date().toISOString(),
    };
    sendMessage(message);
  };

  const clearChat = () => {
    deleteAllMessages();
  };

  return (
    <div className="container d-flex flex-column mx-auto chat-container">
      <Header clearChat={clearChat}/>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;