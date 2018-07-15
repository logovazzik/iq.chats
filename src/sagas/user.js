import api from "../api/user";
import {call, put, takeEvery} from 'redux-saga/effects'
import {USER_LOAD, userUpdateAction} from "../ducks/user";

function* _loadUser() {
    const user = yield call(() => api.getUser());
    yield put(userUpdateAction(user));
}

export function* loadUser() {
    yield takeEvery(USER_LOAD, _loadUser)
}