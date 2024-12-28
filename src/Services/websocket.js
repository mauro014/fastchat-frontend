import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

const API_URL = process.env.REACT_APP_API_URL;

const connectWebSocket = ( onMessageCallback, onClearCallback ) => {
    const socket = new SockJS(`${API_URL}/ws`);
    stompClient = Stomp.over(socket);
  
    stompClient.connect(
      {}, 
      () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/messages', (message) => {

          if (message.body === 'CLEAR') {
            onClearCallback(); 
          } else {
            onMessageCallback(JSON.parse(message.body));
          }
          
        });
      }
    );
  };
  
  const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  const deleteAllMessages = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/deleteAllMessages');
    } else {
      console.error('WebSocket is not connected.');
    }
  };
  
  export { connectWebSocket, sendMessage, deleteAllMessages };