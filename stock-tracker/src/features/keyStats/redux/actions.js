import { SET_RESPONSE, SET_LOADING_KEYSTATS } from "./actionTypes";

export const setResponseAction = response => ({
  type: SET_RESPONSE,
  payload: response
});

export const setLoadingKeyStatsAction = () => ({ type: SET_LOADING_KEYSTATS });
