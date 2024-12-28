import React from 'react';

const MessageList = ({ messages }) => {

  return (
    <div className="flex-grow-1 p-2 border message-list">
      {
        messages.map((mssg, index) => (
          <div key={index} className="mb-2">
            <strong className={ mssg.sender === 'ERROR' ? "text-danger" : "text-primary"}>{mssg.sender}</strong>: {mssg.content} <small>({new Date(mssg.timestamp).toLocaleTimeString()})</small>
          </div>
        ))
      }
    </div>
  );
};

export default MessageList;