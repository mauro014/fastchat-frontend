import React from 'react';

const Header = ( { clearChat } ) => {
    return (
        <div className="d-flex align-items-center p-3  bg-primary">
            <h1 className="m-0 text-white fw-bold">Fast Chat</h1>
            <button className="btn btn-outline-light ms-auto" onClick={clearChat} >Clear Chat</button>
        </div>
      );
};

export default Header;