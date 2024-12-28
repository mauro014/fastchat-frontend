import React from 'react';

const MessageList = ({ messages, clearChat }) => {

  return (
    <div className="message-list">
      <button onClick={clearChat}>Clear chat</button>
      {
        messages.map((mssg, index) => (
          <div key={index} className="message">
            <strong>{mssg.sender}</strong>: {mssg.content} <small>({new Date(mssg.timestamp).toLocaleTimeString()})</small>
          </div>
        ))
      }
    </div>
  );
};

export default MessageList;