import {call, put, race, take} from 'redux-saga/effects'
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

export function* socketsHander() {
    while (true) {
        const {payload} = yield take(OPEN_SOCKET_CONNECTION);
        const socket = api.openSocketConnection(payload);
        const socketChannel = yield call(watchMessages, socket);
        const {cancel} = yield race({
            task: [call(externalListener, socketChannel), call(internalListener, socket)],
            cancel: take(CLOSE_SOCKET_CONNECTION)
        });
        if (cancel && cancel.payload === payload) {
            socketChannel.close();
        }
    }
}

