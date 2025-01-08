import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllMessages = async () => {
    const response = await axios.get(`${API_URL}/getAllMessages`, {
      withCredentials: true,
    });
    return response.data;
};

export const validateGoogleToken = async (accessToken) => {
    const response = await axios.post(`${API_URL}/auth/validateToken`, {
        accessToken,
      }, {
        withCredentials: true,
      });
    return response.data;
};