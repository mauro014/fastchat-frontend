import React, { useState } from "react";
import { createNewChat } from '../Services/api.js';
import { sendNotificationNewChat } from '../Services/websocket.js';

const CreateChat = ({ profile }) => {

    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleModalClose = () => {
        setShowModal(false);
        setEmail("");
        setResponseMessage("");
    };

    const handleChatCreated = ( response ) => {

        let idChat = response.data.id;
    
        if(idChat){
            sendNotificationNewChat(
              idChat , 
              () => { console.log("Error"); } );
        }
    }

    //https://dev.to/bolouie/how-do-you-check-for-valid-email-input-3b3j
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleCreateChat = () => {
        setEmail(email.toLocaleLowerCase())
        if(!isValidEmail(email)){
            setResponseMessage("Invalid email format");
            return;
        }
        if(email === profile.email){
            setResponseMessage("Insert a different email.");
            return;
        }

        createNewChat(
            profile.email,
            email,
            (response) => { 
                handleChatCreated(response); 
                handleModalClose();
            },
            (errorMessage) => setResponseMessage(errorMessage)
        );
    }

    return (
        <>
        <div className="fixed-bottom-height bg-custom-blue p-2 rounded-bottom-3 rounded-end-0">
            <button className='btn btn-outline-light w-100 h-100' onClick={() => setShowModal(true)}>Create new chat</button>
        </div>
        { showModal && (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create chat</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close"
                            onClick={handleModalClose}
                            ></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-3">Enter the user email to chat:</p>
                        <div className="d-flex align-items-center">
                            <input
                                type="email"
                                className="form-control me-2"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateChat()}
                            />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleCreateChat}
                            >
                                Start
                            </button>
                        </div>
                        {responseMessage && (
                            <div className="alert alert-danger mt-3">
                                {responseMessage}
                            </div>
                        )}
                    </div>                    
                </div>
            </div>
        </div>)}
        </>
    );

};

export default CreateChat;