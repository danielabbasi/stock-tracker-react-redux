import { ADD_RESPONSE } from "./actionTypes";

export const addResponseAction = response => ({
    type: ADD_RESPONSE,
    payload: response
  });