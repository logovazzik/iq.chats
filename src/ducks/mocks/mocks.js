import chatsService from '../../chats/services/chats';
import api from '../../api/chats';
import { getRandomInt } from '../../utils';

export const postMessageFromUnknown = () => (dispatch, getState) => {
  const { chats, user } = getState();
  let message = chatsService.getMessageFromUnknownUser(chats, user);
  message.timestamp = Date.now();
  dispatch(postMessageAction(message));
};

export const postMessageFromTenLatest = () => (dispatch, getState) => {
  const { chats, user } = getState();
  const chat = chats.slice(0, 10)[getRandomInt(0, 9)];
  const sender = chat.participants.find((x) => x.id !== user.id);
  const message = chatsService.getMockMessage(chat.id, user.id, sender);
  message.timestamp = Date.now();
  dispatch(postMessageAction(message));
};

export const postMessageFromRandomUser = () => (dispatch, getState) => {
  const { chats, user } = getState();
  const chat = chats[getRandomInt(0, chats.length - 1)];
  const sender = chat.participants.find((x) => x.id !== user.id);
  const message = chatsService.getMockMessage(chat.id, user.id, sender);
  message.timestamp = Date.now();
  dispatch(postMessageAction(message));
};

export const postMessageAction = (message) => (dispatch, getState) => {
    return api.postMessage(message);
};