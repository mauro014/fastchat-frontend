import React from 'react';

const Header = ( { profile, logOut, clearChat } ) => {
    return (
        <div className="d-flex fixed-top-height align-items-center p-2 bg-custom-blue rounded-top-3 rounded-end-0">
            <img src={`${process.env.PUBLIC_URL}/img/fc_ame.png`} 
                    alt="Fast Chat" 
                    className="img-fluid" style={{height: "40px"}}/>
            <button className="btn btn-link p-0 ms-auto" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={profile.picture} alt="User" className="rounded-circle" width="40" height="40" referrerPolicy="no-referrer" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><p className="dropdown-item">{profile.name}<br />
                <small className="text-secondary">{profile.email}</small></p></li>
                <div className="dropdown-divider"></div>
                { clearChat != null ? (<li><button className="dropdown-item" type="button" onClick={clearChat} >Clear Chat</button></li>) : '' }
                <li><button className="dropdown-item" type="button" onClick={logOut} >Log out</button></li>
            </ul>
        </div>
      );
};

export default Header;