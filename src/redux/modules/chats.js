import { createSelector } from 'reselect'

import { getCurrentUser } from './user'
import api from '../../api/chats'
import chatsService from '../../services/chats.service';

const CHATS_UPDATE_ACTION = 'CHATS_LOADED_ACTION';
const CHAT_UPDATE_ACTION = 'CHAT_LOADED_ACTION';

export default function reducer(state = [], action) {
  // switch (action.type){
  //   case AAAAA: 
  //     return handleActionAAAA(stat, action.payload);
  // }
  const { type, payload } = action;
  if (type === CHATS_UPDATE_ACTION) {
    return payload;
  }
  if (type === CHAT_UPDATE_ACTION) {
    const chatIndex = state.findIndex((chat) => {
      return chat.id === payload.id
    });
    if (chatIndex > -1) {
      state.splice(chatIndex, 1, payload);
    }
    else {
      state.unshift(payload);
    }

    return [...state];
  }

  return state;
};

const getChats = (state) => {
  return state.chats || [];
};

const sortedChats = (payload) => {
  payload.sort((a, b) => {
    return b.lastPublishTimestamp - a.lastPublishTimestamp;
  });
  return payload;
};

export const getSortedChats = createSelector(
  getChats,
  sortedChats,
);

export const markAsRead = (chat) => (dispatch, getState) => {
  if (chat.unreadMessagesCount > 0) {
    api.markAsReadChat(chat.id);
    const _chat = chatsService.markAsRead(chat);
    dispatch(chatUpdateAction(_chat))
  }
}

export const chatsUpdateAction = (payload) => (dispatch, getState) => {
  return dispatch({
    type: CHATS_UPDATE_ACTION,
    payload
  });
};
export const chatUpdateAction = (payload) => (dispatch, getState) => {
  return dispatch({
    type: CHAT_UPDATE_ACTION,
    payload
  })
};

export const newMessageAction = (message) => (dispatch, getState) => {
  const state = getState();
  const chats = getChats(state);
  const currentUser = getCurrentUser(state);
  const chat = chatsService.insertIntoChat(message, chats, currentUser);
  if (chat) {
    return dispatch(chatUpdateAction(chat));
  }
  // need to pass sender and recipient, its only for creating mock.
  return api.loadChat(message.chatId, currentUser, message.sender).then((chat) => {
    return dispatch(chatUpdateAction(chat));
  }).catch((err) => {
    console.error('Error while fetching chat with id = ' + message.chatId, err);
  })
};
