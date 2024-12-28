import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
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