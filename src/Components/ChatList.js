import React from 'react';

const ChatList = ({ chats, userEmail }) => {

  return (
    <div className="overflow-auto bg-light flex-grow-1">
      <ul className="list-unstyled">
        {
          chats.map((chat, index) => (
            <li className="list-item-box" key={index} >
              <span className="email">{ (chat.user1.email === userEmail ? chat.user2.email : chat.user1.email) }</span>
              <button className="btn btn-outline-secondary btn-sm rounded-pill ms-auto">Chat</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ChatList;