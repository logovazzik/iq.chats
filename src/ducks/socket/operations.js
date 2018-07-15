import { getConnection } from "./reducer";
import {api} from '../../api/sockets'
import { addConnectionAction, removeConnectionAction } from "./actions";

export const openSocketConnection = (url) => (dispatch, getState) => {
  if (!getConnection(getState(), url)) {
    let socket = api.openSocketConnection(url);
    dispatch(addConnectionAction({url, socket}));

    socket.onmessage = (event) => {
      debugger;
      const message = JSON.parse(event.data);
      dispatch(event.type, message);
    };
  }

};

export const closeSocketConnection = (url) => (dispatch, getState) => {
  const connection = getConnection(getState(), url);
  if (connection) {
    removeConnectionAction(url);
    api.closeSocketConnection(connection);
  }
};
