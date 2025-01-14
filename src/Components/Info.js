import React from 'react';

const Info = ( {showAbout, handleModalClose} ) => {
    return (
        <>
        {
            showAbout && (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">About</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                aria-label="Close"
                                onClick={handleModalClose}
                                ></button>
                        </div>
                        <div className="modal-body">
                            <p className="mb-3"><strong>Email:</strong> mauro014@gmail.com</p>
                            <p className="mb-3">
                                <strong>Front-End:</strong><br />
                                <a href="https://github.com/mauro014/fastchat-frontend" 
                                   target='_blank' 
                                   rel="noopener noreferrer"
                                   >https://github.com/mauro014/fastchat-frontend</a>
                            </p>
                            <p className="mb-3"><strong>Back-End:</strong><br />
                                <a 
                                    href="https://github.com/mauro014/fastchat-backend" 
                                    target='_blank' 
                                    rel="noopener noreferrer">
                                    https://github.com/mauro014/fastchat-backend
                                </a>
                            </p>
                        </div>                    
                    </div>
                </div>
            </div>
            )
        }
        </>
      );
};

export default Info;