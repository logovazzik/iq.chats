import {CHATS_UPDATE_ACTION,CHAT_UPDATE_ACTION } from './types';

export const chatsUpdateAction = (payload) => {
  return ({
    type: CHATS_UPDATE_ACTION,
    payload
  });
};
export const chatUpdateAction = (payload) =>  {
  return ({
    type: CHAT_UPDATE_ACTION,
    payload
  })
};
