import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getChatsByUser = async (email) => {
  const response = await axios.get(`${API_URL}/chatsByUser/${email}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getChatById = async (id) => {
  const response = await axios.get(`${API_URL}/chatById/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getMessagesByChatId = async (chatId) => {
    const response = await axios.get(`${API_URL}/messagesByChatId/${chatId}`, {
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

export const createNewChat = async (email1, email2, handleSuccess, handleError) => {

  await axios.post(`${API_URL}/createChat`, {
    email1: email1,
    email2: email2
  }, {
    withCredentials: true,
  })
  .then((response) => {
    handleSuccess(response);
  })
  .catch((error) => {
    handleError(error.response.data);
  });  

};

export const sendMessage = async (message, handleSuccess, handleError) => {

  await axios.post(`${API_URL}/sendMessage`, 
    message
  , {
    withCredentials: true,
  })
  .then((response) => {
    handleSuccess(response);
  })
  .catch((error) => {
    if(error.response && error.response.data){
      handleError(error.response.data);
    }
    else handleError(error);
  });  
  
};