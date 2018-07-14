import { CURRENT_USER_UPDATE } from "./types";

export const userUpdateAction = (payload) => {
  return {
    type: CURRENT_USER_UPDATE,
    payload
  };
};
