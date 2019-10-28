import {
  SET_RESPONSE,
  SET_LOADING_KEYSTATS,
  SET_ERROR_KEYSTATS
} from "./actionTypes";

export const setResponseAction = response => ({
  type: SET_RESPONSE,
  payload: response
});

export const setLoadingKeyStatsAction = () => ({ type: SET_LOADING_KEYSTATS });

export const setErrorKeyStatsAction = () => ({ type: SET_ERROR_KEYSTATS });
