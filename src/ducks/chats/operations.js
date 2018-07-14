import chatsService from "../../chats/services/chats";
import api from "../../api/chats";
import { getChats } from "./reducer";
import { chatUpdateAction } from './actions';
import { getCurrentUser } from '../user';
import { chatsUpdateAction } from "./index";

export const markAsRead = (chat) => (dispatch, getState) => {
  if (chat.unreadMessagesCount > 0) {
    api.markAsReadChat(chat.id);
    const _chat = chatsService.markAsRead(chat);
    dispatch(chatUpdateAction(_chat))
  }
};

export const loadChats = () => async (dispatch, getState) => {
  let chats = [];
  try {
    chats = await api.loadChats();
  }
  finally {
    dispatch(chatsUpdateAction(chats));
  }
};

export const newMessageOperation = (message) => async (dispatch, getState) => {
  const state = getState();
  const chats = getChats(state);
  const currentUser = getCurrentUser(state);
  const chat = chatsService.insertIntoChat(message, chats, currentUser);
  if (chat) {
    return dispatch(chatUpdateAction(chat));
  }
  // need to pass sender and recipient, its only for creating mock.
  try {
    let _chat = await api.loadChat(message.chatId, currentUser, message.sender)
    return dispatch(chatUpdateAction(_chat));
  } catch (err) {
    console.error('Error while fetching chat with id = ' + message.chatId, err);
  }
};
