import React from 'react';

const MessageList = ({ messages }) => {

  return (
    <div className="flex-grow-1 p-2 border border-secondary message-list overflow-auto">
      {
        messages.map((mssg, index) => (
          <div key={index} className="mb-2 message">
            <strong className={ mssg.sender === 'System Error' ? "text-danger" : "text-primary"}>{mssg.sender}</strong>: {mssg.content} <small>({new Date(mssg.timestamp).toLocaleString()})</small>
          </div>
        ))
      }
    </div>
  );
};

export default MessageList;