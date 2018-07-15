import {CURRENT_USER_UPDATE, USER_LOAD} from "./types";

export const userUpdateAction = (payload) => {
    return {
        type: CURRENT_USER_UPDATE,
        payload
    };
};


export const userLoadAction = () => {
    return {
        type: USER_LOAD
    };
};
