import React, { useState, useEffect } from 'react';
import { getStompClient, subscribe2Chat, updateMessageSubscription } from '../Services/websocket.js';
import { getChatById, getChatsByUser, getMessagesByChatId } from '../Services/api.js';
import MessageList from './MessageList.js';
import ChatList, { createChatMap, modifyChatNotification } from './ChatList.js';
import MessageInput from './MessageInput.js';
import Header from './Header.js';
import CreateChat from './CreateChat.js';
import CurrentChatHeader from './CurrentChatHeader.js';
import Info from './Info.js';

const Chat = ({ profile , logOut }) => {
  
  const [messages, setMessages] = useState([]);  
  const [chats, setChats] = useState(new Map());  
  const [currentChat, setCurrentChat] = useState(null);  
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {

    const fetchChats = async (email) => {
      try {
        const fetchedChats = await getChatsByUser(email);
        if(fetchedChats){

          setChats(createChatMap(fetchedChats));

          if(fetchedChats[0]){
            showChatOnView(fetchedChats[0])
          }
        }
      } catch (err) {
        addNewMessageOnView( createErrorMessage('Failed to load chats.') );
      }
    };
    
    const stompClient = getStompClient(
      (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage) )
    );

    stompClient.connect({}, 
      () => {
        fetchChats(profile.email); 

        subscribe2Chat(profile.email,
          (newChat) => {
              setChats((prevChats) => {
                const newChats = new Map(prevChats); 
                newChats.set(newChat.id, newChat);
                return newChats; 
              });
              showChatOnView(newChat);
            },
          (chat) => modifyChatNotification(chats, chat, true)
        );
      });

  }, [profile]);

  const loadChat = async (idChat) => {
    await getChatById(idChat)
    .then(chat => {
      showChatOnView(chat);
      modifyChatNotification(chats, chat.id, false)
    });
  }

  const showChatOnView = async (chat) => {

    setCurrentChat(chat);
    await getMessagesByChatId(chat.id)
      .then(fetchedMessages => {

        setMessages(fetchedMessages);
        updateMessageSubscription(chat.id,
          (newMessage) => addNewMessageOnView(newMessage) ,
          (errorMessage) =>  addNewMessageOnView( createErrorMessage(errorMessage)) 
        );

      });
  }

  useEffect(() => {

    const lastMessage = document.querySelector(".message-list .message:last-child");
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "instant" });
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

  return (
    <div className="main-container shadow">
      <div className="d-flex">
        <div className="left-column d-flex flex-column border-end">
          <div className="fixed-top-height">
            <Header 
              profile={profile} logOut={logOut}
              showAbout={() => setShowAbout(true)} />
          </div>
          <ChatList 
            chats={chats} 
            userEmail={profile.email} 
            onClick={(idChat) => loadChat(idChat)}
            currentChat={currentChat} />
          <CreateChat profile={profile} />
        </div>
        <div className="right-column d-flex flex-column flex-grow-1">
          <div className="fixed-top-height bg-custom-blue text-white flex-column">
            <CurrentChatHeader currentChat={currentChat} profile={profile} />
          </div>            
          <div className="message-list overflow-auto bg-light p-2 flex-grow-1">
            <MessageList messages={messages} userName={profile.email} />
          </div>
          <MessageInput 
            profile={profile} 
            handleError={(errorMessage) => addNewMessageOnView( createErrorMessage(errorMessage) ) }
            chat={currentChat} />
        </div>
      </div>
      <Info showAbout={showAbout} handleModalClose={() => setShowAbout(false)}/>
    </div>
  );
};

export default Chat;