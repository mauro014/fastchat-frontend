import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

const API_URL = process.env.REACT_APP_API_URL;

const connectWebSocket = ( callback ) => {
    const socket = new SockJS(`http://${API_URL}/ws`);
    stompClient = Stomp.over(socket);
  
    stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe('/topic/messages', (message) => {
        const parsedMessage = JSON.parse(message.body);
        callback(parsedMessage);
      });
    });
  };
  
  const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected.');
    }
  };
  
  export { connectWebSocket, sendMessage };