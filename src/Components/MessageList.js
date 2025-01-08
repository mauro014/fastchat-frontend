import React from 'react';

const MessageList = ({ messages, userName }) => {

  return (
    <div className="flex-grow-1 p-2 message-list overflow-auto shadow bg-white">
      {
        messages.map((mssg, index) => (
          <div key={index} className={`mb-2 message ${mssg.sender === userName ? 'message-sent' : mssg.sender === 'System Error' ? 'message-error' : 'message-received'}`}>
            <strong className={ (mssg.sender === 'System Error' ? "text-danger" : "text-primary") }>{mssg.sender}</strong>: {mssg.content} <small className="text-muted">({new Date(mssg.timestamp).toLocaleString()})</small>
          </div>
        ))
      }
    </div>
  );
};

export default MessageList;