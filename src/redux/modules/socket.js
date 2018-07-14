import api from '../../api/chats';
import { newMessageAction, chatsUpdateAction } from './chats';
import { userUpdateAction } from './user';

let socket;

export const initSocket = () => (dispatch, getState) => {
  socket = api.listenIncoming();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    dispatch(newMessageAction(message));
  };
  load(dispatch);
};

export const closeSocket = () => (dispatch, getState) => {
  socket.close();
};

const load = async dispatch => {
  const user = await api.getUser();
  dispatch(userUpdateAction(user));
  let chats = [];
  try {
    chats = await api.loadChats();
  }
  finally {
    dispatch(chatsUpdateAction(chats));
  }
};