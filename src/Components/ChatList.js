import React from 'react';

export const createChatMap = (fetchedChats) => {
  const chatMap = fetchedChats.reduce((map, chat) => {
    map.set(chat.id, chat);
    return map;
  }, new Map());
  return chatMap;
}

const ChatList = ({ chats, userEmail, onClick, currentChat }) => {

  return (
    <div className="overflow-auto bg-light flex-grow-1">
      <ul className="list-unstyled">
        {
          [...chats.values()].map((chat) => (
            <li 
              className={`list-item-box ${chat.id === currentChat.id ? 'list-item-box-selected' : ''}`}
              key={chat.id} >
              <span className="email">{ (chat.user1.email === userEmail ? chat.user2.email : chat.user1.email) }</span>
              { chat.newMessages && currentChat.id !== chat.id ? (<span className="badge bg-danger text-white ms-2 p-1">New</span> ) : "" }
              <button 
                className="btn btn-outline-secondary btn-sm rounded-pill ms-auto"
                onClick={() => onClick(chat.id)}  >
                  Chat
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ChatList;