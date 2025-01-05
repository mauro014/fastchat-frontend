import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

const API_URL = process.env.REACT_APP_API_URL;

//https://stomp-js.github.io/api-docs/latest/classes/Stomp.html
//https://stomp-js.github.io/api-docs/latest/classes/CompatClient.html
const connectWebSocket = ( onMessageCallback, onClearCallback, onErrorCallback ) => {

    stompClient = Stomp.over(function(){
      return new SockJS(`${API_URL}/ws`)
    });

    stompClient.onWebSocketError = (event) => {
      onErrorCallback("WebSocket error occurred: " + event.reason);
    };

    stompClient.onWebSocketClose = (event) => {
      onErrorCallback("WebSocket connection closed. Reason: " + event.reason);
    };
  
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
  
  const sendMessage = (message, onErrorCallback) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
    } else {
      onErrorCallback("WebSocket is not connected.");
    }
  };

  const deleteAllMessages = (onErrorCallback) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/deleteAllMessages');
    } else {
      onErrorCallback("WebSocket is not connected.");
    }
  };
  
  export { connectWebSocket, sendMessage, deleteAllMessages };