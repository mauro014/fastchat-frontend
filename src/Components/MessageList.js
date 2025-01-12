import React from 'react';

const MessageList = ({ messages, userName }) => {

  return (
    <>
      {
        messages.map((mssg, index) => (
          <div key={index} className={`mb-2 message ${mssg.sender === userName ? 'message-sent' : mssg.sender === 'System Error' ? 'message-error' : 'message-received'}`}>
            <strong className={ (mssg.sender === 'System Error' ? "text-danger" : "text-darkblue") }>{mssg.sender}</strong>: {mssg.content} <small className="text-muted">({new Date(mssg.timestamp).toLocaleString()})</small>
          </div>
        ))
      }
    </>
  );
};

export default MessageList;