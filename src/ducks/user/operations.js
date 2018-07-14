import { userUpdateAction } from "./actions";
import api from "../../api/chats";


export const loadUser = () => async (dispatch) => {
  const user = await api.getUser();
  return dispatch(userUpdateAction(user));
};