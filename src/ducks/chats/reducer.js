import { createSelector } from "reselect";

import { CHAT_UPDATE_ACTION, CHATS_UPDATE_ACTION } from './types';

const handleUpdateChat = (state, payload) => {
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
};

export const getChats = (state) => {
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
  sortedChats
);

export function reducer(state = [], action) {
  const {type, payload} = action;

  switch (type) {
    case CHATS_UPDATE_ACTION:
      return payload;
    case CHAT_UPDATE_ACTION:
      return handleUpdateChat(state, payload);
    default:
      return state;
  }
}
