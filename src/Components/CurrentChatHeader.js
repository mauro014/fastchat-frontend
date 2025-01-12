import React from 'react';

const CurrentChatHeader = ( { currentChat, profile  } ) => {
    return (
        <div className="d-flex justify-content-between align-items-center p-3 ">
            {currentChat ? (
                (
                <p className="mb-0 me-1">
                    <strong>{currentChat.user1.email === profile.email ? currentChat.user2.name : currentChat.user1.name}</strong>
                    <span className="mx-2">|</span>
                    <small className="text-secundary">({currentChat.user1.email === profile.email ? currentChat.user2.email : currentChat.user1.email})</small>
                </p>
                )
            ) :
            (
                <p className="mb-0 me-1"><strong>No chat selected</strong></p>
            )
            }
        </div>
    );
};

export default CurrentChatHeader;