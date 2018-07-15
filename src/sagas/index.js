import {all} from 'redux-saga/effects'

import * as chats from './chats';
import * as users from './user';
import * as sockets from './socket';

export default function* rootSaga() {
    yield all([
        chats.loadChats(),
        sockets.socketsHander(),
        chats.markAsRead(),
        chats.postMessage(),
        chats.newMessage(),
        users.loadUser()
    ])
}