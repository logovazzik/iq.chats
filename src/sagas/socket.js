import { call, put, take, race } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import api from "../api/chats";

//
// function* openSocketConnection(action) {
//   const url = action.payload;
//   if (!getConnection(getState(), url)) {
//     let socket = api.openSocketConnection(url);
//     dispatch(addConnectionAction({url, socket}));
//
//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       yield put(event.type, message);
//     };
//   }
//
// };
//
// export const closeSocketConnection = (url) => (dispatch, getState) => {
//   const connection = getConnection(getState(), url);
//   if (connection) {
//     removeConnectionAction(url);
//     api.closeSocketConnection(connection);
//   }
// };
//
//
//
// export function* openSocket() {
//   yield takeEvery(ADD_CONNECTION_ACTION, _loadChats);
// }
//
// export function* closeSocket() {
//   yield takeEvery(REMOVE_CONNECTION_ACTION, _markAsRead);
// }

function watchMessages(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.send('Connection estabished'); // Send data to server
    };
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      emit({type: msg.type, payload: msg.payload});
    };
    return () => {
      socket.close();
    };
  });
}

function* internalListener(socket) {
  while (true) {
    const data = yield take('EXE_TASK');
    socket.send(JSON.stringify({type: 'setTask', status: 'open'}))
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

function* wsHandling() {
  while (true) {
    const data = yield take('START_WEBSOCKET');
    const socket = api.openSocketConnection(data.url);
    const socketChannel = yield call(watchMessages, socket);
    const {cancel} = yield race({
      task: [call(externalListener, socketChannel), call(internalListener, socket)],
      cancel: take('STOP_WEBSOCKET')
    });
    if (cancel) {
      socketChannel.close();
    }
  }
}

