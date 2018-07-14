const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';

export default function reducer(state = null, action) {
  const { type, payload } = action;
  if (type === CURRENT_USER_UPDATE) {
    return payload;
  }
  return state;
};

export const getCurrentUser = (state) => {
  return state.user;
};

export const userUpdateAction = (payload) => (dispatch, getState) => {
  return dispatch({
    type: CURRENT_USER_UPDATE,
    payload
  })
};
