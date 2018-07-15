import { ADD_CONNECTION_ACTION, REMOVE_CONNECTION_ACTION} from './types';

export const addConnectionAction = (payload) => {
  return ({
    type: ADD_CONNECTION_ACTION,
    payload
  });
};

export const removeConnectionAction = (payload) => {
  return ({
    type: REMOVE_CONNECTION_ACTION,
    payload
  });
};
