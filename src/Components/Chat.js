import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage, deleteAllMessages, sendNotificationNewChat } from '../Services/websocket.js';
import { getChatsByUser } from '../Services/api.js';
import MessageList from './MessageList.js';
import ChatList from './ChatList.js';
import MessageInput from './MessageInput.js';
import Header from './Header.js';
import CreateChat from './CreateChat.js';

const Chat = ({ profile , logOut }) => {
  
  const [messages, setMessages] = useState([]);  
  const [chats, setChats] = useState([]);  

  useEffect(() => {

    // const fetchMessages = async () => {
    //   try {
    //     const fetchedMessages = await getAllMessages();
    //     setMessages(fetchedMessages);
    //   } catch (err) {
    //     addNewMessageOnView( createErrorMessage('Failed to load messages.') );
    //   }
    // };

    const fetchChats = async (email) => {
      try {
        const fetchedChats = await getChatsByUser(email);
        setChats(fetchedChats);
      } catch (err) {
        addNewMessageOnView( createErrorMessage('Failed to load chats.') );
      }
    };

    if (profile) {
      //fetchMessages();
      fetchChats(profile.email);
    }

    connectWebSocket(
          (newMessage) => addNewMessageOnView(newMessage) 
        , (newChat) => setChats((prevChats) => [...prevChats, newChat])
        , () => setMessages([])
        , (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
        , profile.email
    );

  }, [profile]);

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

  const handleSendMessage = (content) => {
    const message = {
      sender: profile.email, 
      content,
      timestamp: new Date().toISOString(),
    };
    sendMessage(
      message, 
      (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
    );
  };

  const handleChatCreated = ( response ) => {

    let idChat = response.data.id;

    if(idChat){
        sendNotificationNewChat(
          idChat , 
          () => { console.log("Error"); } );
    }

  }

  const clearChat = () => {
    deleteAllMessages(
      (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
    );
  };

  return (
    <>
      <div className="main-container shadow">
        <div className="d-flex">
          <div className="left-column d-flex flex-column border-end">
            <div className="fixed-top-height">
              <Header clearChat={clearChat} profile={profile} logOut={logOut}/>
            </div>
            <ChatList chats={chats} userEmail={profile.email} />
            <CreateChat profile={profile} handleChatCreated={(response) => handleChatCreated(response) } />
          </div>
          <div className="right-column d-flex flex-column flex-grow-1">
            <div className="fixed-top-height bg-custom-blue text-white">Right Header</div>
            <MessageList messages={messages} userName={profile.email} />
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>

  </>
  );
};

export default Chat;