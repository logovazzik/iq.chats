import {all, call, cancel, fork, put, take, takeEvery} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'

import api from "../api/sockets";
import {CLOSE_SOCKET_CONNECTION, OPEN_SOCKET_CONNECTION, SEND_SOCKET_MESSAGE} from "../ducks/socket";

function watchMessages(socket) {
    return eventChannel((emit) => {
        socket.onopen = () => {
            socket.send('Connection estabished');
        };
        socket.onmessage = (event) => {
            const {type, payload} = JSON.parse(event.data);
            emit({type, payload});
        };
        return () => {
            socket.close();
        };
    });
}

function* internalListener(socket) {
    while (true) {
        const data = yield take(SEND_SOCKET_MESSAGE);
        socket.send(JSON.stringify(data))
    }
}

function* externalListener(socketChannel) {
    while (true) {
        const action = yield take(socketChannel);
        yield put(action);
    }
}

function* startListeners(socketChannel) {
    yield all([call(externalListener, socketChannel), call(internalListener, socketChannel)]);
}

function* openConnection(action) {
    const {payload} = action;
    const socket = api.openSocketConnection(payload);
    const socketChannel = yield call(watchMessages, socket);
    const listenersTask = yield fork(startListeners, socketChannel);
    while (true) {
        const action = yield take(CLOSE_SOCKET_CONNECTION);
        if (payload === action.payload) {
            api.closeSocketConnection(socket);
            socketChannel.close();
            yield cancel(listenersTask)
        }
    }
}

export function* socketsHander() {
    yield takeEvery(OPEN_SOCKET_CONNECTION, openConnection);
}

