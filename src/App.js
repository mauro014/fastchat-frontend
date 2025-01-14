import React, { useState, useEffect } from 'react';
import Chat from './Components/Chat.js';
import Login from './Components/Login.js';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { validateGoogleToken } from './Services/api.js';

//https://muhammedsahad.medium.com/react-js-a-step-by-step-guide-to-google-authentication-926d0d85edbd
function App() {
    const [ profile, setProfile ] = useState(null);
    const [ dangerMessage, setDangerMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const token = codeResponse.access_token;

            try {
                setLoading(true);
                setDangerMessage("");
                const backendResponse = await validateGoogleToken(token);
                setProfile(backendResponse);                
                sessionStorage.setItem('userProfile', JSON.stringify(backendResponse));
            } catch (err) {
                if(err.code === "ERR_NETWORK"){
                    console.error("");
                    setDangerMessage("Server is not reachable. Please try later.");
                }
            }
            setLoading(false);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
        sessionStorage.setItem('userProfile', null);
    };

    useEffect(
        () => {
            const savedUserProfile = sessionStorage.getItem('userProfile');
            if (savedUserProfile && savedUserProfile !== "undefined") {
                setProfile(JSON.parse(savedUserProfile));
              }
        },
        [ ]
    );

    return (
        <div>
            {profile ? (
                    <Chat profile={profile} logOut={logOut} />
            ) : (
                <>
                    <Login 
                        onClick={() => login()} 
                        dangerMessage={dangerMessage}
                        loading={loading} />
                </>
            )}
        </div>
    )
}

export default App;
