import api from '../../api/chats';
import { newMessageOperation, chatsUpdateAction } from '../chats';
import { userUpdateAction } from '../user';

let socket;

export const initSocket = () => (dispatch, getState) => {
  socket = api.listenIncoming();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    dispatch(newMessageOperation(message));
  };

};

export const closeSocket = () => (dispatch, getState) => {
  socket.close();
};

