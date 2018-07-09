export const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';

export const userUpdateAction = (payload) => (dispatch, getState) => {
    return dispatch({
        type: CURRENT_USER_UPDATE,
        payload
    })
};