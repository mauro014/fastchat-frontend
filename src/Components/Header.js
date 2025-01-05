import React from 'react';

const Header = ( { clearChat, clearUsername } ) => {
    return (
        <div className="d-flex align-items-center p-3  bg-primary">
            <h1 className="m-0 text-white fw-bold">Fast Chat</h1>
            <div className="btn-group ms-auto">
                { clearChat != null ? (<button className="btn btn-outline-light ms-auto" onClick={clearChat} >Clear Chat</button>) : '' }
                { clearUsername != null ? (<button className="btn btn-outline-light ms-auto" onClick={clearUsername} >Log out</button>) : '' }
            </div>
        </div>
      );
};

export default Header;