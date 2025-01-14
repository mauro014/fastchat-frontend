import React from 'react';

const Login = ( { onClick , dangerMessage, loading } ) => {
    return (
        <div 
            className="container mx-auto m-5">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 p-4 d-flex flex-column align-items-center border rounded bg-white shadow mx-auto py-5">
                <img src={`${process.env.PUBLIC_URL}/img/FastChat.PNG`} 
                    alt="Fast Chat" 
                    className="img-fluid mb-5" />
                {loading ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                ):(
                    <button className='google-button' onClick={() => onClick()}>
                    <img
                        src={`${process.env.PUBLIC_URL}/img/sign_in_google.png`}
                        alt="Sign in google" />
                    </button>
                )}
                
                {dangerMessage ?
                 (<div class="alert alert-danger mt-2" role="alert">{dangerMessage}</div>) : ""
                }
            </div>
        </div>
      );
};

export default Login;