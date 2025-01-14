import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;
let currentChatSubscription = null;

const API_URL = process.env.REACT_APP_API_URL;

//https://stomp-js.github.io/api-docs/latest/classes/Stomp.html
//https://stomp-js.github.io/api-docs/latest/classes/CompatClient.html
const getStompClient = ( onErrorCallback ) => {

    stompClient = Stomp.over(function(){
      return new SockJS(`${API_URL}/ws`)
    });

    stompClient.onWebSocketError = (event) => {
      onErrorCallback("WebSocket error occurred: " + event.reason);
    };

    stompClient.onWebSocketClose = (event) => {
      onErrorCallback("WebSocket connection closed. Reason: " + event.reason);
    };

    return stompClient;
  };

  const subscribe2Chat = (userEmail, onNewChatCallback, onNewNotificationCallback) => {

    stompClient.subscribe(`/topic/chat/${userEmail}`, (chat) => {
      const body = JSON.parse(chat.body);
      onNewChatCallback(body)
    });

    stompClient.subscribe(`/topic/notification/${userEmail}`, (chat) => {
      onNewNotificationCallback(chat.body)
    });

  }

  const updateMessageSubscription = (newIdChat, onMessageCallback) => {

    if(currentChatSubscription){
      currentChatSubscription.unsubscribe();
    }

    const subscription = stompClient.subscribe(`/topic/messages/${newIdChat}`, (message) => {
      onMessageCallback(JSON.parse(message.body));      
    });

    currentChatSubscription = subscription;
  };

  const sendNotificationNewChat = (chatId, onErrorCallback) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/notifyChat', {}, chatId);
    } else {
      onErrorCallback("WebSocket is not connected.");
    }
  };

  const sendNotificationNewMessage = (messageId, onErrorCallback) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/notifyMessage', {}, messageId);
    } else {
      onErrorCallback("WebSocket is not connected.");
    }
  };
  
  export { getStompClient, sendNotificationNewChat, sendNotificationNewMessage , subscribe2Chat, updateMessageSubscription};