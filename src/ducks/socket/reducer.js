import { ADD_CONNECTION_ACTION, REMOVE_CONNECTION_ACTION } from "./types";

export function reducer(state = {}, action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_CONNECTION_ACTION: {
      if (!state[payload.url]) {
        return Object.assign({}, state, {[payload.url]: payload.socket});
      }
      return state;
    }
    case REMOVE_CONNECTION_ACTION: {
      const _state = Object.assign({}, state);
      delete _state[payload.url];
      return _state;
    }
    default:
      return state;
  }
}

export const getConnection = (state, url) => {
  return state.sockets[url];
};
