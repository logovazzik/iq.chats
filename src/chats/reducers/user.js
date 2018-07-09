import {CURRENT_USER_UPDATE} from '../actions/user';

export const userReducer = (state = null, action) => {
    const {type, payload} = action;
    if (type === CURRENT_USER_UPDATE) {
        return payload;
    }
    return state;
};

export const getCurrentUser = (state) => {
    return state.user;
};