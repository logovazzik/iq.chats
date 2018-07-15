import {CLOSE_SOCKET_CONNECTION, OPEN_SOCKET_CONNECTION} from './types';

export const openSocketConnectionAction = (payload) => {
    return {
        type: OPEN_SOCKET_CONNECTION,
        payload
    };
};

export const closeSocketConnectionAction = (payload) => {
    return {
        type: CLOSE_SOCKET_CONNECTION,
        payload
    };
};
