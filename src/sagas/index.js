import * as chats from './chats';
import * as users from './user';
import { all } from 'redux-saga/effects'


export default function* rootSaga() {
  yield all([
    chats.loadChats(),
    chats.markAsRead(),
    users.loadUser()
  ])
}