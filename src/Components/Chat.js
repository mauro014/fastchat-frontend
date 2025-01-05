import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage, deleteAllMessages } from '../Services/websocket.js';
import { getAllMessages } from '../Services/api.js';
import MessageList from './MessageList.js';
import MessageInput from './MessageInput.js';
import Header from './Header.js';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getAllMessages();
        setMessages(fetchedMessages);
      } catch (err) {
        addNewMessageOnView( createErrorMessage('Failed to load messages.') );
      }
    };

    fetchMessages();

    connectWebSocket(
          (newMessage) => addNewMessageOnView(newMessage) 
        , () => setMessages([])
        , (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
    );

  }, []);

  useEffect(() => {

    const lastMessage = document.querySelector(".message-list .message:last-child");
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth" });
    }

  }, [messages]);
  

  const createErrorMessage = (messageContent) => {
    return {
      sender: "System Error", 
      content: messageContent + " - Please try again later.",
      timestamp: new Date().toISOString(),
    };
  }

  const addNewMessageOnView = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  const handleSendMessage = (content, user) => {
    const message = {
      sender: user, 
      content,
      timestamp: new Date().toISOString(),
    };
    sendMessage(
      message, 
      (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
    );
  };

  const clearChat = () => {
    deleteAllMessages(
      (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
    );
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