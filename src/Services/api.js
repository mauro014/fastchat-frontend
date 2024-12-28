import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllMessages = async () => {
  try {
    console.log(API_URL);
    const response = await axios.get(`${API_URL}/getAllMessages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching previous messages:', error);
    return [{
      "sender": "ERROR", 
      "content": String(error),
      "timestamp": new Date().toISOString()
    }];
  }
};